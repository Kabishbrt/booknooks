import React, { useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { sortbooks,filterexec } from "./Actions/filterActions";
import { fetchBooks } from "./Actions/bookActions";
import { getStoredToken } from "./Actions/authActions";
import axios from "axios";

export const Init = () => {
  const dispatch = useDispatch();
  const {books} = useSelector((state) => state.books);
  const {all_products, filter_products,sorting_value} = useSelector((state) => state.filter);
  const {Cart} = useSelector((state) => state.auth);
  const {text,genre,BookAuthor,price,avg_rating} = useSelector((state) => state.filter.filters);

  const verifyTokenOnServer = async (token) => {
    try {
      dispatch({
        type: 'INITIALIZE',
      });
      const response = await fetch(`http://localhost:5000/token`, {
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



  useDispatch(()=>{
    const fetchcart = async(token)=>{
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
        if(cartresponse.status===200){
          dispatch({
            type: 'CART_UPDATE',
            payload: 
            {
              cart: cartresponse.data.items || [],
            },
          });
        }
      }
  }
    const token = getStoredToken();
    if(token){
      fetchcart(token);
    }
  },[Cart]);

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
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: 
            {
              cart: cartresponse.data.items || [],
              username:tokenData.username,
              userid : tokenData.userID,
            },
          });
        } else {
          dispatch({
            type: 'LOGOUT',
          });
        }
      }
      try {
        // Fetch books when the application is loaded

        await dispatch(fetchBooks());

      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

 
  useEffect(() => {
    if (books.length>0) {
        dispatch(sortbooks());
        dispatch(filterexec());
      }
  }, [sorting_value,text,genre,BookAuthor,price,avg_rating]);
}