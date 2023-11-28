import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './Reducers/booksReducer'

export default configureStore({
  reducer: {
    books : booksReducer
  }
})