// src/redux/reducers/authReducer.js

const initialState = {
    isAuthenticated: false
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
          ...state
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
  