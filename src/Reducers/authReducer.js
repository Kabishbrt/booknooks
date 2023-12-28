// src/redux/reducers/authReducer.js

const initialState = {
    isAuthenticated: false,
    message: null,
    loginalert: ''
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          loginalert: action.payload,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          message: action.payload.message
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false
        };
      case 'CLEAR_ALERT':
        return {
          ...state,
          loginalert: '',
        };
      
      default:
        return state;
    }
  };
  
  export default authReducer;
  