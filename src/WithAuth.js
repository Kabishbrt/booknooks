import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import axios from "axios";
import { getStoredToken } from "./Actions/authActions";


const WithAuth = (Component) => {
    const [isAuthenticated, setisAuthenticated] = useState();
    const verifyTokenOnServer = async (token) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URl}/token`, {
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
          return { isValidToken: false }; // Assume the token is invalid on error
        }
      };
      useEffect(() => {
        const fetchData = async () => {
          const token = getStoredToken();
          
    
          if (token) {
            const tokenData = await verifyTokenOnServer(token);
            if (tokenData.isValidToken) {
              const cartresponse = await axios.get(
                `http://localhost:5000/cart/${tokenData.userID}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
            //   dispatch({
            //     type: 'LOGIN_SUCCESS',
            //     payload: 
            //     {
            //       cart: cartresponse.data.items || [],
            //       username:tokenData.username,
            //       userid : tokenData.userID,
            //     },
            //   });
            } 
            setisAuthenticated(true);
          }
        };
        fetchData();
      }, []);

    return (props) => {
      // Check if user is authenticated (you can replace this with your authentication logic)
    //   const isAuthenticated = true; // replace with your actual authentication check

      if (isAuthenticated) {
        // If authenticated, render the component with its props
        return <Component {...props} />;
      } else {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
      }
    };
  };

export default WithAuth;
