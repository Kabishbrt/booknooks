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

export const logout = () => (dispatch) => {
    // Clear the token from the cookie by setting an expired date
    document.cookie = `userloginbooknookstoken=; path=/;`;
  
    // Dispatch an action for logout
    dispatch({
      type: 'LOGOUT',
    });
  
    // You may also want to navigate the user to the login page or another desired route
  };
  
// src/redux/actions/authActions.js
export const getStoredToken = () => {
    const cookies = document.cookie.split('; ');
    console.log('All Cookies:', cookies);
  
    const tokenCookie = cookies.find(row => row.startsWith('userloginbooknookstoken'));
    console.log('Token Cookie:', tokenCookie);
  
    if (!tokenCookie) {
      console.log('Token not found in cookies');
      return null;
    }
  
    const tokenValue = tokenCookie.split('=')[1];
    console.log('Token Value:', tokenValue);
  
    return tokenValue || null;
  };
  