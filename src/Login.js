// src/components/Login.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, getStoredToken } from "./Actions/authActions";
import { handleKeyPress } from "./Functions";

export const Login = () => {
  const {message, isAuthenticated, Initializing} = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => { 
    if (username !== "" && password !=="") {
      dispatch(login(username, password, navigate));
    } else {
      alert("Empty Fields")
    }


  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (username != "" && password !=="") {
        handleLogin();
      } else {
        alert("Empty Fields")
      }

    }
  };

  
  if(isAuthenticated ===true){
    navigate('/');
  }else{
    return (
      <LoginForm initializing={Initializing}>
        <div className="login-container">
          <div className="login-box">
            <h1>Login</h1>
            <InputLabel>
              Username:
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputLabel>
            <InputLabel>
              Password:
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputLabel>
            <span>{(message)}</span>
            <NavLinkStyled to="/signup">New User? Click Here to Register</NavLinkStyled>
            <LoginButton type="button" onClick={handleLogin}>
              Login
            </LoginButton>
          </div>
        </div>
      </LoginForm>
    );

  }
 
};

const LoginForm = styled.form`
  span{
    color: red;
    font-size:12px;
  }
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("bookstore.jpg");
    background-size: cover;
    background-position: center;
  }

  .login-box {
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
  filter: ${({ initializing }) => (initializing ? 'blur(5px)' : 'none')}; // Apply blur conditionally
  pointer-events: ${({ initializing }) => (initializing ? 'none' : 'auto')}; // Disable pointer events conditionally
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

const LoginButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 50%;
  margin: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: red;
  }
`;

const NavLinkStyled = styled(NavLink)`
  font-size: 14px;
  text-decoration: none;
  color: #3498db;
  cursor: pointer;
  margin-top: 10px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;
