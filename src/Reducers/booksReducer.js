// reducers/booksReducer.js
const initialState = {
    totalcount: 0,
    books: [],
    isLoading: false, // Add isLoading property
    error: null,
    status: null
  };
  
  const booksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_BOOKS_REQUEST':
        return {
          ...state,
          isLoading: true,
        };
      case 'FETCH_BOOKS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          totalcount: action.payload.totalcount,
          books: action.payload.books,
          error: null,
          status: action.payload.status
        };
      case 'FETCH_BOOKS_FAILURE':
        return {
          ...state,
          isLoading: false,
          totalcount: 0,
          books: [],
          error: action.payload,
          status: action.payload.status
        };
      // Add more cases as needed
      default:
        return state;
    }
  };
  
  export default booksReducer;
  