import React from 'react'
import { useSelector,useDispatch } from 'react-redux';

export const Orders = () => {
  const {userid, loginalert} = useSelector((state) => state.auth);
  //localhost:5000/orders/user/536558
  //fetch this, destructure data and show it in a table
  return (
    <h1>{userid}</h1>
  )
}
