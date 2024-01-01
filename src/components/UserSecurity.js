import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorPopup from './ErrorPopup';

export const UserSecurity = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrors("Passwords don't match");
      return;
    }

    try {
      // Add your API endpoint for changing the password
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any authentication headers if needed
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (response.ok) {
        // Password changed successfully
        setErrors('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setErrors(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
      setErrors('Failed to change password. Please try again.');
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
      {errors && <ErrorPopup errorMessage={errors} onClose={closeErrorPopup} />}
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
