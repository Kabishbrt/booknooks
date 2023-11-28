import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <LoginForm>
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form>
            <InputLabel>
              Username:
              <input type="text" placeholder="Username" />
            </InputLabel>
            <InputLabel>
              Password:
              <input type="password" placeholder="Password" />
            </InputLabel>
            <NavLinkStyled to="/signup">New User? Click Here to Register</NavLinkStyled>

            <LoginButton type="button">Login</LoginButton>
          </form>
        </div>
      </div>
    </LoginForm>
  );
};

const LoginForm = styled.form`
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
