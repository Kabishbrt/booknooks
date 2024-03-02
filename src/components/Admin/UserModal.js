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

  const UserModal = ({ isOpen, onClose, editUserData }) => {

    const [Edit, setEdit] = useState(false);

  const API = `${process.env.REACT_APP_API_URL}/users`;
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({});
  
  const authToken = getStoredToken();

  useEffect(() => {
    setLoading(true);
 setFormData({...editUserData});
      setLoading(false);
  }, [editUserData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : type === 'number' ? Math.max(0, +value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
   
        const response = await axios.put(`${API}/${editUserData.UserID}`, formData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          }
        }
        );
        if (response.status === 200) {
          // Handle success
          alert('User Updated Successfully');
          //fetch user
        }if (response.status!==200) {
          setLoading(false);
          // Display the error message in an alert
          alert('Cannot update: ' + response.message);
        }else{
          console.log(response.status);
        }
  

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with non-success status');
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
    
        // Access the error message from the server response
        const serverErrorMessage = error.response.data.message;
    
        // Display the error message in an alert
        alert(`Error: ${serverErrorMessage}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during request setup:', error.message);
        // Display the error message in an alert
        alert(`Error: ${error.message}`);
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
              <h3>{Loading ? '....Loading....' : 'Update User'}</h3>
              <br></br>
              <form onSubmit={handleSubmit}>
              <FormGrid>
                <div>
                  <FormLabel>User ID</FormLabel>
                  <FormInput type="number" name="UserID" value={formData.UserID} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Username</FormLabel>
                  <FormInput type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Phone</FormLabel>
                  <FormInput type="number" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Country</FormLabel>
                  <FormInput type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>City</FormLabel>
                  <FormInput type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Age</FormLabel>
                  <FormInput type="number" name="Age" value={formData.Age} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>State</FormLabel>
                  <FormInput type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Street</FormLabel>
                  <FormInput type="text" name="street" value={formData.street} onChange={handleChange} />
                </div>

                <div>
                  <FormLabel>Add Admin</FormLabel>
                  <select name="isAdmin" value={formData.isAdmin?formData.isAdmin:false} onChange={handleChange}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>

                <FormButtonContainer>
                  <FormButton type="submit">Update</FormButton>
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
  
  export default UserModal;