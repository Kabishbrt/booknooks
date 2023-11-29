// Actions/bookActions.js
import axios from 'axios';

export const fetchBooks = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });
    const response = await axios.get('http://localhost:5000/books/');
    dispatch({
      type: 'FETCH_BOOKS_SUCCESS',
      payload: {
        totalcount: response.data.totalcount,
        books: response.data.books,
        status: response.status
      },
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_BOOKS_FAILURE',
      payload: {
        error: error.message,
        status: error.response ? error.response.status : null, // Include status in payload
      },
    });
  }
};
