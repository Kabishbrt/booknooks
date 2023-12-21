import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './Reducers/booksReducer';
import filterReducer from './Reducers/filterReducer';
import authReducer from './Reducers/authReducer';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    auth: authReducer,
  },
  devTools: {
    serialize: {
      replacer: (key, value) => {
        // Exclude the 'auth' slice from serialization
        if (key === 'auth') {
          return undefined;
        }
        return value;
      },
    },
  },
});

export default store;
