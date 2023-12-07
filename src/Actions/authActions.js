import axios from 'axios';
export const login = (username, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/users/auth', { username, password });
    const token = response.data.token;
    console.log(token);
    document.cookie = `userloginbooknookstoken=${token}; path=/;`;
    dispatch({
      type: 'LOGIN_SUCCESS',
    });

    // Navigate to the home page (or any desired route)
    navigate('/');
  } catch (error) {
    console.error('Login failed', error);

    // Dispatch an action for login failure
    dispatch({
      type: 'LOGIN_FAILURE',
    });
  }
};

export const logout = (goto) => (dispatch) => {
    // Clear the token from the cookie by setting an expired date
    document.cookie = `userloginbooknookstoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
    console.log(document.cookie);
  
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
        console.log('Token Value:', tokenValue);
  
        return tokenValue || null;
    }
    
   
  };
  