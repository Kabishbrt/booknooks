import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getStoredToken } from '../Actions/authActions';
import {useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  margin: 3rem;
`;

const UserDetailsWrapper = styled.div`
  max-width: 600px;
  font-size: 1.4rem;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  span{
    font-size: 1.5rem;
  }
  input{
    height:20px;
    padding:5px;
    border-radius: 5px;

  }
  button{
    padding: 4px;
    border-radius: 3px;

    &:hover{
      color: white;
      background-color: red;
      cursor:pointer;
    }
  }
`;

const UserDetailsHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const UserDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const UserDetailsTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const UserDetailsTableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const UserDetailsTableCell = styled.td`
  padding: 10px;
`;

const EditProfileButton = styled.button`
  margin-top: 10px;
`;

const CancelButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
`;

export const UserDetails = () => {
  const { userid, loginalert, isAuthenticated, Initializing} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authToken = getStoredToken();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  useEffect(() => {
    if(Initializing===false && isAuthenticated===false){
      navigate('/login');
    }
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userid}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setUserDetails(data.user);
        setUpdatedUserData(data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error (show alert, redirect, etc.)
      }
    };

    fetchUserDetails();
  }, [userid]);

  const handleInputChange = (key, value) => {
    setUpdatedUserData((prevData) => ({ ...prevData, [key]: value }));
  };


  const handleEditProfileClick = () => {
    setEditMode(true);
  };

  const handleSaveChangesClick = async() => {
    try {
      const updatedUserData = {};
      
      // Iterate over the original user details and collect the updated values from the input fields
      Object.entries(userDetails).slice(1,userDetails.length).forEach(([key, value]) => {
        const inputField = document.querySelector(`input[name=${key}]`);
        updatedUserData[key] = inputField ? inputField.value : value;
      });
      const response = await fetch(`http://localhost:5000/users/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        alert("Profile Updated");
        const fetchUserDetails = async () => {
          try {
            const response = await fetch(`http://localhost:5000/users/${userid}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
            const data = await response.json();
            setUserDetails(data.user);
          } catch (error) {
            alert('Error fetching user details:'+error);
            // Handle error (show alert, redirect, etc.)
          }
        };
        // For example, you might want to fetch the updated user details again
        fetchUserDetails();
        // After saving changes, exit edit mode
        setEditMode(false);
      } else if (!response.ok) {
        const responseData = await response.json();
        
        // Display the error message in an alert
        alert('Cannot update: ' + responseData.message);
      }
    } catch (error) {
      alert('Error updating user details:'+error);
      // Handle other types of errors (e.g., network issues)
      // You might want to show an alert or perform other error handling here
    }


    // After saving changes, exit edit mode
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setUpdatedUserData({});
    // Reset any changes made in the input fields and exit edit mode
    setEditMode(false);
  };

  if(Initializing===false){
  return (

    <Wrapper>
    <UserDetailsWrapper>
      <UserDetailsHeader>User Details</UserDetailsHeader>

      {userDetails && (
        <UserDetailsTable>
          <tbody>
            {Object.entries(userDetails).slice(1,userDetails.length).map(([key, value]) => (
              <UserDetailsTableRow key={key}>
                <UserDetailsTableHeader>{key}</UserDetailsTableHeader>
                <UserDetailsTableCell>
                  {isEditMode ? (
                    key==="UserID"?(
                      <span>{value}</span>
                    ):(

                      <input
                          type="text"
                          name={key}
                          value={updatedUserData[key] !== undefined ? updatedUserData[key] : value}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                    )
                  ) : (
                    <span>{value}</span>
                  )}
                </UserDetailsTableCell>
              </UserDetailsTableRow>
            ))}
          </tbody>
        </UserDetailsTable>

      )}
        {isEditMode ? (
          <>
          <EditProfileButton onClick={handleSaveChangesClick}>Save Changes</EditProfileButton>
          <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        </>
        ) : (
          <EditProfileButton onClick={handleEditProfileClick}>Edit Profile</EditProfileButton>
        )}
    </UserDetailsWrapper>
    </Wrapper>
  );
  }else{
    <h3>Loading</h3>
  }
};
