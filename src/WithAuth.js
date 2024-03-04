import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getStoredToken } from "./Actions/authActions";
import { useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';

const WithAuth = (Component) => {
  const [isAdmin, setisAdmin] = useState(); // Set initial state to false
  const token = getStoredToken();

  useEffect(() => {
    const checkAndSetAdmin = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);

          // Assuming the decoded token has a property isAdmin
          const isAdminValue = decodedToken.isAdmin;

          setisAdmin(isAdminValue);
          console.log(isAdminValue);
        } catch (error) {
          console.error('Error decoding token:', error);
          setisAdmin(false); // Set isAdmin to false on error
        }
      } else {
        setisAdmin(false); // Set isAdmin to false if no token is present
      }
    };

    checkAndSetAdmin();
  }, [token]);

  return (props) => {
    if (isAdmin === true) {
      return <Component {...props} />;
    } else if (isAdmin === false) {
      return <Navigate to="/" />;
    } else {
      return <h1>Loading...</h1>;
    }
  };
};

export default WithAuth;
