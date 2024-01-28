import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export const Cart = () => {
  const {Cart} = useSelector((state)=>state.auth);
  console.log(Cart)
  if(Cart.length ===0){
    return <h2>No items in cart</h2>
  }
  return (
    <>
      {Cart.map((item, index) => (
        <div key={index}>
          <p>Item ID: {item.itemId}</p>
          <p>Quantity: {item.quantity}</p>
          <br />
        </div>
      ))}
    </>
  );
};
