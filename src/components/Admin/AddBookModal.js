import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { fetchBooks } from '../../Actions/bookActions';
import {useDispatch} from 'react-redux';
import { getStoredToken } from '../../Actions/authActions';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:100;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 900px; /* Increased width */
  width: 100%;
  margin-top: 10px;
  position: relative;
`;

const FormInput = styled.input`
  width: calc(100%); /* Increased width slightly */
  padding: 10px;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  color: #007bff;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const FormButtonContainer = styled.div`
  grid-column: span 4;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

const FormButton = styled.button`
  background: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
`;

const CancelButton = styled.button`
  background: #fff;
  color: #007bff;
  padding: 12px;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
`;

const AddBookModal = ({ isOpen, onClose, onSubmit, editBookDetails }) => {
  const [Edit, setEdit] = useState(false);

  const API = `${process.env.REACT_APP_API_URL}/books`;
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ISBN: '',
    BookTitle: '',
    BookAuthor: '',
    YearOfPublication: '',
    Publisher: '',
    ImageURLS: null,
    ImageURLM: null,
    ImageURLL: null,
    Price: '',
    Stock: '',
    genre: '',
    isFeatured: false,
  });
  const token = getStoredToken();

  useEffect(() => {
    setLoading(true);
    if (editBookDetails) {
      setEdit(true);
      axios
        .get(`${API}/id/${editBookDetails._id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          setFormData(res.data.book);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setFormData({
            ISBN: '',
            BookTitle: '',
            // ... (other fields)
            isFeatured: false,
          });
          setLoading(false);
        });
    } else {
      setFormData({
        ISBN: '',
        BookTitle: '',
        // ... (other fields)
        isFeatured: false,
      });
      setLoading(false);
    }
  }, [editBookDetails]);

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    const inputValue = type === 'file' ? files[0] : type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObject = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value);
    });

    try {

      if(Edit===true){
        const response = await axios.put(`${API}/${editBookDetails._id}`, formDataObject,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if(response.status===200){
          dispatch(fetchBooks());
          alert("Book Updated Succesfully");
        }

      }else{
        const response = await axios.post(API, formDataObject);
        if(response.status===201){
          dispatch(fetchBooks());
          alert("Book Added Succesfully");
        }
      }

      // Handle success
      setLoading(false);
    } catch (error) {

        setLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with non-success status");
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);

          // Access the error message from the server response
          const serverErrorMessage = error.response.data.message;
          
          // Do something with the error message, e.g., display it to the user
          alert(`Error: ${serverErrorMessage}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error during request setup:", error.message);
        }
    }
    onClose();
  };
  return (
    <>
      {isOpen && (
        
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <h3>{Loading?('....Loading....'):('Add or Update Book')}</h3>
            
            <br></br>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <div>
                  <FormLabel>ISBN</FormLabel>
                  <FormInput type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Book Title</FormLabel>
                  <FormInput type="text" name="BookTitle" value={formData.BookTitle} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Book Author</FormLabel>
                  <FormInput type="text" name="BookAuthor" value={formData.BookAuthor} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Year of Publication</FormLabel>
                  <FormInput
                    type="text"
                    name="YearOfPublication"
                    value={formData.YearOfPublication}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <FormLabel>Publisher</FormLabel>
                  <FormInput type="text" name="Publisher" value={formData.Publisher} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Image (Small)</FormLabel>
                  <FormInput type="file" accept="image/*" name="ImageURLS" onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Image (Medium)</FormLabel>
                  <FormInput type="file" accept="image/*" name="ImageURLM" onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Image (Large)</FormLabel>
                  <FormInput type="file" accept="image/*" name="ImageURLL" onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Price</FormLabel>
                  <FormInput type="text" name="Price" value={formData.Price} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Stock</FormLabel>
                  <FormInput type="text" name="Stock" value={formData.Stock} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Genre</FormLabel>
                  <FormInput type="text" name="genre" value={formData.genre} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Is Featured</FormLabel>
                  <select name="isFeatured" value={formData.isFeatured} onChange={handleChange}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>

                <FormButtonContainer>
                  <FormButton type="submit">{Edit?("Update"):("Submit")}</FormButton>
                  <CancelButton onClick={onClose}>Cancel</CancelButton>
                </FormButtonContainer>
              </FormGrid>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AddBookModal;
