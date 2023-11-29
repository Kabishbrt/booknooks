import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './Reducers/booksReducer'
import filterReducer from './Reducers/filterReducer'

export default configureStore({
  reducer: {
    books : booksReducer,
    filter: filterReducer
  }
})