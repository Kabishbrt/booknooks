
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoredToken } from './Actions/authActions';
import styled from "styled-components";


export const Orders = () => {
  const { userid, loginalert } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const authToken = getStoredToken();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/user/${userid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (loginalert && authToken) {
      fetchOrders();
    }
  }, [userid, loginalert, authToken, dispatch]);

  return (
    <OrdersContainer>
      {userid && authToken ? (
        <>
          <h1 style={{ fontSize: '24px' }}>Orders: {userid}</h1> 
          {orders.order && orders.order.length > 0 ? (
            <OrdersTable>
              <thead>
                <tr>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>Book</TableHeader>
                  <TableHeader>Order Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Book ID</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>SubTotal</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.order.map((order) => (
                  <tr key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>1982{/*Make a component showing booktitle and image passing product id as prop*/}</TableCell>
                    <TableCell>{order.OrderDate}</TableCell>
                    <TableCell>{order.Status}</TableCell>
                    <TableCell>{order.ProductID}</TableCell>
                    <TableCell>{order.Quantity}</TableCell>
                    <TableCell>{order.SubTotal}</TableCell>
                  </tr>
                ))}
              </tbody>
            </OrdersTable>
          ) : (
            <p>...</p>
          )}
        </>
      ) : (
        <p>Please log in to view your orders.</p>
      )}
      
    </OrdersContainer>
  );
};

const OrdersContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
   
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 18px;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableCellBase = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableCell = styled(TableCellBase)`
  font-size: 16px;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;




