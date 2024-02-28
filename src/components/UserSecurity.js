import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import ErrorPopup from './ErrorPopup';
import { getStoredToken, logout } from '../Actions/authActions';
import {Navigate, useNavigate} from "react-router-dom";
export const UserSecurity = () => {
  const { userid, loginalert, isAuthenticated, Initializing } = useSelector((state) => state.auth);


  console.log(userid,loginalert);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(Initializing===false && isAuthenticated ===false){

    navigate('/');
  }
  const authToken = getStoredToken();
  console.log(authToken); 

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(newPassword.length<5 || confirmPassword.length<5){
      alert("Passwords length should atleast be 4.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userid}`, {
        method: 'PUT', // Use PUT method for updating the password
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Add /* global authToken */
        },
        body: JSON.stringify({
          password:newPassword,
        }),
      });

      if (response.status===200) {
        setErrors('');
        setNewPassword('');
        setConfirmPassword('');
        window.alert("Password Changed Sucessfully");
      } else if(response.status===403 || response.status===404){
        window.alert("Failed to change password");
        dispatch(logout());
        navigate('/')
        
      }
      else {
        const errorData = await response.json();
        setErrors(errorData.message || 'Failed to change password');
        window.alert("Failed to change password");
        dispatch(logout());
        navigate('/');
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
      setErrors('Failed to change password. Please try again.');
      window.alert("Failed to change password");
      dispatch(logout());
      navigate('/');
    }
  };

  const closeErrorPopup = () => {
    setErrors('');
  };

  return (
    <ChangePasswordForm>
      <div className="change-password-container">
        <div className="change-password-box">
          <h1>Change Password</h1>
          <form onSubmit={handleChangePassword}>
            <InputLabel>
              New Password:
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputLabel>
            <InputLabel>
              Confirm Password:
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputLabel>
            <ChangePasswordButton type="button" onClick={handleChangePassword}>
              Change Password
            </ChangePasswordButton>
          </form>
        </div>
      </div>
      
    </ChangePasswordForm>
  );
};

const ChangePasswordForm = styled.form`
  .change-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    background-color:white;
    background-image: url("bookstore.jpg");
    background-size: cover;
    background-position: center;
  }

  .change-password-box {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 24px;
    color: #333;
  }
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  margin-bottom: 10px;

  input {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ChangePasswordButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: red;
  }
`;

export default UserSecurity;
