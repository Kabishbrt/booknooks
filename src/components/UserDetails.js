import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getStoredToken } from '../Actions/authActions';
export const UserDetails = () => {

  const {userid, loginalert} = useSelector((state) => state.auth);
  const authToken = getStoredToken();
    // const [State, setState] = useState({ isLoading: true, book: [], status: 0 });
  return (
    <h1>UserDetails</h1>
  )
}
