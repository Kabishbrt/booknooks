// Alert.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const Overlay = styled.div`
  font-size: 1.5rem;
  position: fixed;
  top: 10px;
  right: 2%;
  top: 10%;
  z-index: 1000;
  width: auto;
  max-width: 300px; /* Set a maximum width */
  margin: 0 auto; /* Center the alert horizontally */
  background-color: ${({ theme }) => theme.colors.helper}; /* Example background color for error messages */
  color: #fff; /* Example text color for error messages */
  border: 1px solid #f5c6cb; /* Example border color for error messages */
  border-radius: 5px; /* Add border radius for rounded corners */
  padding: 10px; /* Add padding for spacing inside the alert */
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in ;
`;
const Alert = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, loginalert} = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      // Check if the alert has already been shown using localStorage
      const hasShownAlert = localStorage.getItem('hasShownAlert');
    
      // Show the alert when isAuthenticated becomes true and hasShownAlert is not true
      if (isAuthenticated && hasShownAlert !== 'true') {
        setShow(true);
    
        // Automatically hide the alert after 2 seconds
        const timeoutId = setTimeout(() => {
          setShow(false);
    
          // Set a flag in localStorage indicating that the alert has been shown
          localStorage.setItem('hasShownAlert', 'true');
        }, 1500);
    
        return () => clearTimeout(timeoutId);
      }
    }, [isAuthenticated]);
  
    return <Overlay show={show}>Welcome {loginalert}!</Overlay>; // Customize the alert message as needed
  };
  

export default Alert;
