import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { sortbooks,filterexec } from "./Actions/filterActions";
import { fetchBooks } from "./Actions/bookActions";
import { getStoredToken } from "./Actions/authActions";

export const Init = () => {
  const dispatch = useDispatch();
  const {status,isLoading,totalcount, books, error } = useSelector((state) => state.books);
  const {all_products, filter_products,sorting_value} = useSelector((state) => state.filter);
  const {text,genre,BookAuthor,price,avg_rating} = useSelector((state) => state.filter.filters);

  const verifyTokenOnServer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        // Handle non-OK responses (e.g., server error, token invalid, etc.)
       
      }

      const result = await response.json();
      return result; // Assuming the server responds with a property indicating token validity
    } catch (error) {
      console.error('Error verifying token on server:', error);
      return { isValidToken: false }; // Assume the token is invalid on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const storedTokenPresent = response.ok;

      if (storedTokenPresent) {
        const tokenData = await verifyTokenOnServer();

        if (tokenData.isValidToken) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: tokenData.username,
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