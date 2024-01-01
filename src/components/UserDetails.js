import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
export const UserDetails = () => {

  const {userid, loginalert} = useSelector((state) => state.auth);
  console.log(userid,loginalert);
    // const [State, setState] = useState({ isLoading: true, book: [], status: 0 });
  return (
    <h1>UserDetails</h1>
  )
}
