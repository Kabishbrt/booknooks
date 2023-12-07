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

  useEffect(() => {
    const storedToken = getStoredToken();
    console.log(storedToken);
    if (storedToken) {
      console.log(storedToken);
      dispatch({
        type: 'LOGIN_SUCCESS',
      });
    }
    const fetchBooksData = async () => {
      try {
        // Fetch books when the application is loaded
        await dispatch(fetchBooks());

      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooksData();
  }, []);
 
  useEffect(() => {
    if (books.length>0) {
        dispatch(sortbooks());
        dispatch(filterexec());
      }
  }, [sorting_value,text,genre,BookAuthor,price,avg_rating]);
}