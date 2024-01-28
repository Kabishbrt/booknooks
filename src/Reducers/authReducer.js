// src/redux/reducers/authReducer.js

const initialState = {
    Initializing: true,
    isAuthenticated: false,
    message: null,
    loginalert: '',
    userid:'',
    Cart: []
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
          Cart: action.payload.cart,
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
      case 'CART_UPDATE':
        return{
          ...state,
          Cart: action.payload.cart,
        }
      default:
        return {
          ...state,
          Initializing: false,
        };

    }
  };
  
  export default authReducer;
  