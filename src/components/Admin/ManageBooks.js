import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddBookModal from './AddBookModal';
import axios from 'axios';
import { fetchBooks } from '../../Actions/bookActions';
import { getStoredToken } from '../../Actions/authActions';

const ManageBooksContainer = styled.div`
  text-align: center;
  font-size: 11px;
`;

const TableContainer = styled.div`
  margin: 0 auto; /* Center the table horizontally */
  max-width: 600px; /* Adjust the maximum width as needed */
`;

const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const StyledTableHeader = styled.th`
  height: 40px; /* Adjust the height as needed */
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTableCell = styled.td`
  height: 40px; /* Adjust the height as needed */
  border: 1px solid #ddd;
  padding: 8px;
`;

const SearchContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 10px;
`;

const AddButton = styled.button`
  margin-left: 10px;
  padding: 8px;
  font-size: 10px;
`;

const EditButton = styled.button`
  margin-right: 10px; /* Adjust the right margin between buttons as needed */
  padding: 8px;
  font-size: 10px;
`;

const DeleteButton = styled.button`
  padding: 8px;
  font-size: 10px;
`;

export const ManageBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { isAuthenticated, Initializing } = useSelector((state) => state.auth);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
  const [editBookDetails, setEditBookDetails] = useState(null);

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.BookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update the number of total pages based on the filtered books
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Update the index of the last book based on the filtered books
  const indexOfLastBook = currentPage * itemsPerPage;
  // Update the index of the first book based on the filtered books
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;

  // Get the current books to be displayed on the current page
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (book) => {
    setEditBookDetails(book);
    setAddBookModalOpen(true);
  };

  const token = getStoredToken();
  const handleDelete = (bookId) => {
    try {
      const response = axios
        .delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => alert("Successfully Deleted") )
        .catch(err => alert("Failed To Delete"));
          dispatch(fetchBooks())
        
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handleAddNewBook = (formData) => {
    // Implement logic to add a new book using formData
    console.log(formData);
    setAddBookModalOpen(false);
    setEditBookDetails(null);
  };

  if(isAuthenticated==true){

    return (
      <ManageBooksContainer>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search by Book Title or BookID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <AddButton onClick={() => setAddBookModalOpen(true)}>Add New Book</AddButton>
        </SearchContainer>
        <AddBookModal
          isOpen={isAddBookModalOpen}
          onClose={() => {
            setAddBookModalOpen(false);
            setEditBookDetails(null); // Reset editBookDetails state on modal close
          }}
          onSubmit={handleAddNewBook}
          editBookDetails={editBookDetails} // Pass the details to the modal
        />
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>Book Title</StyledTableHeader>
                <StyledTableHeader>Action</StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book._id}>
                  <StyledTableCell>{book.BookTitle}</StyledTableCell>
                  <StyledTableCell>
                    <EditButton onClick={() => handleEdit(book)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(book._id)}>Delete</DeleteButton>
                  </StyledTableCell>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
        <PaginationContainer>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </PaginationContainer>
      </ManageBooksContainer>
    );
  }else{
    return "";
  }
};
