import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoredToken, logout, logouts } from './Actions/authActions';
import styled from 'styled-components';
import OrdersBookInfo from './components/OrdersBookInfo';
import {NavLink, useNavigate} from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { truncateText } from './Functions';


export const Orders = () => {
  const { userid, loginalert, Initializing } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const authToken = getStoredToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/user/${userid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            
          },
        });
        if (!response.ok) {
          // Handle non-successful responses
          console.log('Error fetching orders:', response.status);
          if (response.status === 403) {
            // Unauthorized, dispatch logout
            dispatch(logouts());
            navigate('/login');
          }
          return;
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {


          console.log('Error fetching orders:', error.status);

      }
    };

    if (Initializing ===false && loginalert && authToken) {
      fetchOrders();
    }
  }, [userid, loginalert, authToken]);

  const handleremove= async (order,bookid)=>{
    console.log(order);
    const newProducts = order.Products.map((book)=>{
      const { _id, ...bookWithoutId } = book;
      if(book.BookId._id===bookid){
        return { ...bookWithoutId, BookId:book.BookId._id, Status: 'Cancelled' };
      }else{
        return{...bookWithoutId, BookId:book.BookId._id}
      }
    })
    const {_id, ...orderwithoutid}=order
    //console.log(newProducts);
    const updatedorder = {
      ...orderwithoutid,
      Products: newProducts
    }
    console.log(updatedorder);

    try{
      const API=`${process.env.REACT_APP_API_URL}/orders/${userid}/${_id}`;
      console.log(API);
      const response = await fetch(API,{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedorder)
      });
      const data = await response.json();
      setOrders(data);
      console.log(order);
    }catch(err){
      alert(err.response.data.message);
    }

  }

  return (
    <Container>
      {userid && authToken ? (
        <Content>
          <Title>Orders of {loginalert}</Title>
          {orders.order && orders.order.length > 0 ? (
            <OrdersTable>
              <thead>
                <tr>
                  <TableHeader>Order</TableHeader>
                  <TableHeader>Order Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>SubTotal</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.order.slice().reverse().map((order) => (
                  <tr key={order._id}>

                    <TableCell>
                    <div className='grid-two'>
                    {
                      
                    order.Products.map((book)=>(
                      <>
                        <NavLink to={`/Book/${encodeURIComponent(book.BookId.BookTitle)}`}  className="nav-link">
                       <img src={book.BookId.ImageURLS}></img>
                       </NavLink>
                       <NavLink to={`/Book/${encodeURIComponent(book.BookId.BookTitle)}`}  className="nav-link">
                       <p>{truncateText(book.BookId.BookTitle,30)} <br></br><p>Quantity:{book.Quantity}</p></p>
                       </NavLink>
                       {(order.Status!=='Delivered')?(
                        (book.Status!=='Cancelled')?(

                          <a href="#" className='remove' onClick={()=>handleremove(order,book.BookId._id)}>Cancel</a>
                        ):('')

                       ):('')}
                       {(book.Status=='Cancelled')?(<p className='cancel'>Cancelled</p>):('')}
                       </>
                    ))
                    }
                    </div>
                    </TableCell>
                    
                    <TableCell>
                        <p>{new Date(order.OrderDate).toLocaleDateString()}<br></br>
                        {new Date(order.OrderDate).toLocaleTimeString()}</p>
                    </TableCell>
                    <TableCell><p>{order.Status}</p></TableCell>
                    <TableCell><p>{order.SubTotal}</p></TableCell>
                  </tr>
                ))}
              </tbody>
            </OrdersTable>
          ) : (
            <NoOrdersMessage>No Orders Placed Yet</NoOrdersMessage>
          )}
        </Content>
      ) : (
        <p>...</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media only screen and (max-width:768px){
    padding:0px;
  }
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
  font-size: 18px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  &:first-child {
    width: 300px; /* Set a specific width for the first header */
  }
  &:nth-child(2) {
    width: 200px; /* Set a specific width for the second header */
  }
  &:nth-child(3) {
    width: 120px; /* Set a specific width for the second header */
  }
  &:nth-child(4) {
    width: 100px; /* Set a specific width for the second header */
  }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-size: 14px;  
  white-space: initial; /* Reset white-space to allow wrapping */

  @media only screen and (max-width: 768px) {
    font-size: 9px;
   
  }
  p{
    font-size: 13px;
    @media only screen and (max-width: 768px) {
      font-size: 11px;
     
    }
  }
  .grid-two{
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25fr;  
    row-gap: 10px;
    column-gap:5px;
    @media only screen and (max-width: 768px) {
      grid-template-columns: 0.25fr 0.50fr 0.25fr;
      column-gap:8px;
      
      .cancel{
        font-size:10px;
      }
     
    }
  }
  .nav-link{
    color:black;

    &:hover{
      color: ${({theme})=>(theme.colors.helper)};
    }
  }
  .remove{
    display: flex;

    height: 100%;
    padding:4px;
    border-radius: 6px;

    &:hover{
      cursor:pointer;
      color: red;
      text-decoration: underline;
    }
    @media only screen and (max-width: 768px) {
      font-size: 11px;
    }
  
`;

const NoOrdersMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

