import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import OrdersBookInfo from './components/OrdersBookInfo';
import styled from 'styled-components';
import { getStoredToken, updateCheckout, updatecart } from './Actions/authActions';
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { OrderSummary } from './components/OrderSummary';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
  display: grid;
  grid-template-columns: 2.25fr 0.75fr; /* Adjust the sizes as needed */
  grid-gap: 5px;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  .trash{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding:2px;
    border-radius: 6px;

    &:hover{
      cursor:pointer;
      background-color: red;
      color: white;
      
    }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  max-width: 30px;
  white-space: initial; /* Reset white-space to allow wrapping */
  word-break: break-all; /* Allow breaking words */

  @media only screen and (max-width: 768px) {
    font-size: 9px;
    max-width: none; /* Allow full width on smaller screens */
   
  }
  .remove{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding:4px;
    border-radius: 6px;

    &:hover{
      cursor:pointer;
      background-color: red;
      color: white;
      
    }
  }
`;

const NoOrdersMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Checkout = styled.div`
.title{
  background-color: ${({ theme }) => theme.colors.tableheader};
  padding: 5px;
  font-size: 18px;
  font-weight:bold;
}

text-align:center;
  .checkoutcontainer{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:5px;
    padding:15px;
    box-shadow: 1px 9px 4px -3px rgba(0, 0, 0, 0.3);

    .total{
      font-size: 18px;
      margin-top:10px;
      text-align:left;
    } 

    .buy{
      background-color: ${({ theme }) => theme.colors.btn2};
      padding: 5px 15px 5px 15px;
      border-radius: 6px;
      border: white;
      color:white;
      font-size:18px;
      margin-top:10px;

      &:hover{
        transition: 0.1s;
        border: 2px solid #000;
        cursor:pointer;
        background-color: ${({ theme }) => theme.colors.btn2};
        color: White;
      }
    }
    @media only screen and (max-width:768px){

      .total{
        font-size: 10px;
      }
      .buy{
        padding: 2px 8px 2px 8px;
        font-size:10px;
      }
    }
  }
`;


export const Cart = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [itemsRemoved, setItemsRemoved] = useState(false);
  const {Cart, checkout, userid} = useSelector((state)=>state.auth);

  
  const authToken = getStoredToken();
  
  
  const dispatch = useDispatch();
  
  const fetchBook = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/id/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const bookData = await response.json();
      return bookData.book;
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const fetchBooksForCart = async () => {
    setLoading(true);
    const bookPromises = Cart.map((item) => fetchBook(item.itemId));

    try {
      const fetchedBooks = await Promise.all(bookPromises);
      const booksData = {};
      fetchedBooks.forEach((book, index) => {
        booksData[Cart[index].itemId] = book;
      });
      setBooks(booksData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!itemsRemoved) {
      fetchBooksForCart();
      setItemsRemoved(false); // Reset the state after fetching
    }
  }, [Cart, authToken, itemsRemoved]);


  
  const handleCheckboxChange = (item,price) => {
    const isItemInCheckout = checkout.some((checkoutItem) => checkoutItem.itemId === item.itemId);
    const itemwithprice= {...item,price};
    if (!isItemInCheckout) {
      // Add item to checkout
      const newCheckout = [...checkout, itemwithprice];
      dispatch(updateCheckout(newCheckout));
    } else {
      // Remove item from checkout
      const newCheckout = checkout.filter((checkoutItem) => checkoutItem.itemId !== item.itemId);
      dispatch(updateCheckout(newCheckout));
    }
  };
  const handleremove = async (itemid, userid, authToken, checkout) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}/cart/delete`;
    console.log(userid);
    try {
      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemid, userId: userid }),
      });
  
      if (response.ok) {
        const obj = await response.json();
        // Handle success, update your cart state or UI as needed
        console.log(obj);
        const newCheckout = checkout.filter((checkoutItem) => checkoutItem.itemId !== itemid);
        dispatch(updateCheckout(newCheckout));
        dispatch(updatecart(obj.data.items));
        setItemsRemoved(true);
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
    } catch (error) {
      // Handle error
      console.log('Error removing item:', error);
      throw error; // You can re-throw the error if needed
    }
  };

  const updateCart = async (cart) => {
    const url = `${process.env.REACT_APP_API_URL}/cart/${cart.userId}`;
    const token = getStoredToken();
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: cart.userId, items: cart.items }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(updatecart(responseData.data.items)); 
        console.log('Cart updated successfully:', responseData);
      } else {
        console.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during cart update:', error);
    }
  };

  const multipleremove=async(checkout,userid,Cart)=>{
    const newCheckout = [];
    // const items = checkout.map((item)=>({itemId:item.itemId, quantity: item.quantity}))
    //const newcart = Cart.filter((item)=> !checkout.map((checkoutitem)=>checkoutitem.itemId).includes(item.itemId));
    const newcart = Cart.filter((item)=> !checkout.some((checkoutitem)=>checkoutitem.itemId===item.itemId));
    const data = {
      userId:userid,
      items:newcart,
      status: "active"
    };
    updateCart(data);
    dispatch(updateCheckout(newCheckout));

  }


  if(Cart!=null && loading===false){
    const shippingfee = 150;
    let totalPrice = checkout.reduce((total, item) => total + (item.price*item.quantity), shippingfee);

    return (
      <Container>
        <OrdersTable>
                <thead>
                  <tr>
                    <TableHeader>Check</TableHeader>
                    <TableHeader>Book</TableHeader>
                    <TableHeader>Quantity</TableHeader>
                    <TableHeader>{(checkout && checkout.length>0)?(<button onClick={()=>multipleremove(checkout,userid,Cart)} className='trash'><RiDeleteBin6Line size={20} /></button>):null}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                    {Cart.slice().reverse().map((item, index) => (
                      <tr key={index}>
                        <TableCell>
                        <input
                          type="checkbox"
                          value={item}
                          checked={checkout.some((checkoutItem) => checkoutItem.itemId === item.itemId)}
                          onChange={() => handleCheckboxChange(item,books[item.itemId] ? books[item.itemId].Price : '')}
                /></TableCell>
                        <TableCell>
                          <div>
                            {loading ? (
                              "Loading..."
                            ) : (
                              <>
                                <img
                                  src={books[item.itemId] ? books[item.itemId].ImageURLM : ''}
                                  alt={books[item.itemId] ? books[item.itemId].BookTitle : ''}
                                  style={{ maxWidth: '50px', maxHeight: '50px' }}
                                />
                                <p style={{ fontSize: '12px', '@media only screen and (max-width: 768px)': { fontSize: '8px' } }}>
                                    {books[item.itemId] ? books[item.itemId].BookTitle : ' Not Available'}
                                  </p>
                                  <p style={{ fontSize: '12px', '@media only screen and (max-width: 768px)': { fontSize: '8px' } }}>
                                    Rs.{books[item.itemId] ? books[item.itemId].Price : ' Not Available'}
                                  </p>
                              </>
                            )}
                          </div>
                          {/*<OrdersBookInfo productId={item.itemId} authToken={authToken} />*/}
                        </TableCell>
                        <TableCell>
                          {item.quantity}</TableCell>
                        <TableCell><button className='remove' onClick={()=>handleremove(item.itemId,userid,authToken,checkout)}><ImCross /></button></TableCell>
                      </tr>
                    ))}
                </tbody>
        </OrdersTable>
        <OrderSummary checkout={checkout} totalPrice={totalPrice} shippingfee={shippingfee} multipleremove={multipleremove}/>
      </Container>
    );
  }else{
    return <h1>...</h1>; 
  }
};
