// src/redux/reducers/authReducer.js

const initialState = {
    Initializing: true,
    isAuthenticated: false,
    message: null,
    loginalert: '',
    userid:''
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGING_IN':
        return{
          ...state,
          message:'Logging in, Please Wait...',
        }
      case 'INITIALIZE':
        return{
          ...state,
        Initializing:true,
        }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          Initializing: false,
          isAuthenticated: true,
          loginalert: action.payload.username,
          userid: action.payload.userid
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          Initializing: false,
          message: action.payload.message
        };
      case 'LOGOUT':
        return {
          ...state,
          Initializing: false,
          isAuthenticated: false,
          loginalert: null,
          userid: null
        };
      case 'CLEAR_ALERT':
        return {
          ...state,
          Initializing: false,
          loginalert: '',
        };
      
      case 'CLEAR_MESSAGE':
        return{
          ...state,
          message:null,
        }
      
      default:
        return {
          ...state,
          Initializing: false,
        };

    }
  };
  
  export default authReducer;
  