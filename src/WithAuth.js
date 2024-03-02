import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getStoredToken } from "./Actions/authActions";
import {useSelector} from "react-redux"

const WithAuth = (Component) => {
  const [isAdmin, setisAdmin] = useState();
  const [tokenData, setTokenData] = useState(null); // Initialize tokenData as null
  const token = getStoredToken();


  const verifyTokenOnServer = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      const result = await response.json();
      return result; // Assuming the server responds with a property indicating token validity
    } catch (error) {
      console.error('Error verifying token on server:', error);
      return false; // Assume the token is invalid on error
    }
  };
  const check = async (token) => {
    if (token) {
      const data = await verifyTokenOnServer(token);
      setTokenData(data);

      if (data && data.isAdmin) {
        setisAdmin(true);
      }
    }
  };

  useEffect(() => {
    check(token); // Call the check function inside the useEffect
  }, []); // Empty dependency array to run only once on mount

  return (props) => {

    if (isAdmin) {
      // If authenticated, render the component with its props
      console.log(isAdmin);
      return <Component {...props} />;
    } else if(isAdmin===false){
      // If not authenticated, redirect to the login page
      
      // You may replace the following line with a redirection to the login page
      return <Navigate to="/" />;
    }
  };
};

export default WithAuth;
