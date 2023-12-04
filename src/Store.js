import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './Reducers/booksReducer'
import filterReducer from './Reducers/filterReducer'
import authReducer from './Reducers/authReducer'

export default configureStore({
  reducer: {
    books : booksReducer,
    filter: filterReducer,
    auth : authReducer
  }
})