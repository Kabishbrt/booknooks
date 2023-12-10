// src/redux/reducers/authReducer.js

const initialState = {
    isAuthenticated: false,
    message: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true
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
      default:
        return state;
    }
  };
  
  export default authReducer;
  