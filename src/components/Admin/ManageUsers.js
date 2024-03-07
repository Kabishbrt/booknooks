import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserModal from './UserModal';
import { getStoredToken } from '../../Actions/authActions';
import {useSelector} from 'react-redux';
const ManageBooksContainer = styled.div`
  text-align: center;
  font-size: 11px;
`;

const TableContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
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
  height: 40px;
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTableCell = styled.td`
  height: 40px;
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
  margin-right: 10px;
  padding: 8px;
  font-size: 10px;
`;

const DeleteButton = styled.button`
  padding: 8px;
  font-size: 10px;
`;
export const ManageUsers = () => {
  const {userid, isAuthenticated} = useSelector((state)=>state.auth)
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = getStoredToken();
  
  const fetchUsers = async (pageNumber, qry = '') => {
    try {
      setIsLoading(true); // Set loading to true when starting the fetch
      const uri = `${process.env.REACT_APP_API_URL}/users/page/${pageNumber}?qry=${qry}`;
      console.log(uri);
      const response = await fetch(uri,{
        method:'GET',
        headers:{
           Authorization : `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after the fetch is completed
    }
  };
  useEffect(() => {
    setCurrentPage(1); // Initial fetch when the component mounts
  }, [searchQuery]);
  useEffect(() => {
    fetchUsers(currentPage,searchQuery); // Initial fetch when the component mounts
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber, () => {
      // console.log('Fetching users with page:', pageNumber, 'and query:', searchQuery);
      fetchUsers(pageNumber, searchQuery);
    });
  };

  const handleSearch = () => {
    setCurrentPage(1)// Fetch users when search button is clicked with the current page number
    fetchUsers(currentPage, searchQuery);
  };

  const handleSearchChange = (e) => {
    // console.log('Input value:', e.target.value);
    setSearchQuery(e.target.value);
    // Remove the setCurrentPage(1); line from here
  };

  const handleAddNewBook = (formData) => {
    // Implement logic to add a new user using formData
    console.log(formData);
    setUserModalOpen(false);
    setEditUserData(null);
    fetchUsers(currentPage, searchQuery); // Fetch users after adding a new user with the current page number and search query
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchUsers(currentPage, searchQuery); // Fetch users when Enter is pressed with the current page number and search query
    }
  };

  const handleEdit = (user) => {
    setEditUserData(user);
    setUserModalOpen(true);
  };

  const handleDelete = (userId) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.data.message}`);
          }
          return response.json();
        })
        .then(() => {
          alert('Successfully Deleted');
          fetchUsers(currentPage, searchQuery); // Fetch users after deletion with the current page number and search query
        })
        .catch((error) => {
          console.error(error.message);
          alert(`Error: ${error.message}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if(isAuthenticated){

    return (
      <ManageBooksContainer>
        <SearchContainer>
          <SearchInput
            type="number"
            placeholder="Search by UserID"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </SearchContainer>
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => {
            setUserModalOpen(false);
            setEditUserData(null);
            fetchUsers(currentPage, searchQuery);
          }}
          onSubmit={handleAddNewBook}
          editUserData={editUserData}
        />
        <TableContainer>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <StyledTable>
              <thead>
                <tr>
                <StyledTableHeader>Id</StyledTableHeader>
                  <StyledTableHeader>Username</StyledTableHeader>
                  <StyledTableHeader>Action</StyledTableHeader>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <StyledTableCell>{user.UserID}</StyledTableCell>
                    <StyledTableCell>{user.username}</StyledTableCell>
                    <StyledTableCell>
                      {userid===user.UserID?(''):(
                        <DeleteButton onClick={() => handleDelete(user._id)}>Delete</DeleteButton>
                        )}
                        <EditButton onClick={() => handleEdit(user)}>Edit</EditButton>
                    </StyledTableCell>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
        </TableContainer>
        <PaginationContainer>
          
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous (Page {currentPage - 1})
          </button>
          <span>{`Current Page: ${currentPage}`}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={users.length < 20}>
            Next (Page {currentPage + 1})
          </button>
        </PaginationContainer>
      </ManageBooksContainer>
    );
  }else{
    return "";
  }
};
