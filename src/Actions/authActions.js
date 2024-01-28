import axios from 'axios';

export const login = (username, password, navigate) => async (dispatch) => {
  const baseurl = process.env.REACT_APP_API_URL
  try {
    dispatch({ type: 'LOGGING_IN' });
    const response = await axios.post(`${baseurl}/users/auth`, { username, password });
    const token = response.data.token;
    if (response.data.token) {
      const userid=  response.data.userID;
      const cartresponse = await axios.get(
        `${baseurl}/cart/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // const cartresponse = await axios.post(`${baseurl}/cart/${userid}`);
      var message = response.data.message;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Expires in one week
      document.cookie = `userloginbooknookstoken=${token}; expires=${expirationDate.toUTCString()}; path=/;`;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          cart: cartresponse.data.items || [],
          username:response.data.username,
          userid: response.data.userID
        }
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' });
      }, 300);
      
      // Navigate to the home page (or any desired route)
      navigate('/');
    }else{
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: response.data,
      });

    }
  } catch (error) {

    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Login failed', error.response.data.message);

      // Dispatch an action for login failure
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request', error.message);
    }

    // Dispatch an action for login failure
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data
    });
  }
};

export const logout = (goto) => (dispatch) => {
    // Clear the token from the cookie by setting an expired date
    document.cookie = `userloginbooknookstoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
  
    // Dispatch an action for logout
    dispatch({
      type: 'LOGOUT',
    });
    goto();
    // You may also want to navigate the user to the login page or another desired route
  };
  
  
// src/redux/actions/authActions.js
export const getStoredToken = () => {
    const cookies = document.cookie.split('; ');

  
    const tokenCookie = cookies.find(row => row.startsWith('userloginbooknookstoken'));
  
    if(tokenCookie){
        const tokenValue = tokenCookie.split('=')[1];
        // console.log('Token Value:', tokenValue);
  
        return tokenValue || null;
    }
    
   
  };
  