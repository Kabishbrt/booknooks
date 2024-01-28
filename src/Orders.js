import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStoredToken } from './Actions/authActions';
import styled from 'styled-components';
import OrdersBookInfo from './components/OrdersBookInfo';

export const Orders = () => {
  const { userid, loginalert } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
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
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (loginalert && authToken) {
      fetchOrders();
    }
  }, [userid, loginalert, authToken]);

  return (
    <Container>
      {userid && authToken ? (
        <Content>
          <Title>Orders for {loginalert}</Title>
          {orders.order && orders.order.length > 0 ? (
            <OrdersTable>
              <thead>
                <tr>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>Book</TableHeader>
                  <TableHeader>Order Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>SubTotal</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.order.map((order) => (
                  <tr key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      <OrdersBookInfo productId={order.ProductID} authToken={authToken} />
                    </TableCell>
                    <TableCell>{new Date(order.OrderDate).toLocaleDateString()}</TableCell>
                    <TableCell>{order.Status}</TableCell>
                    <TableCell>{order.Quantity}</TableCell>
                    <TableCell>{order.SubTotal}</TableCell>
                  </tr>
                ))}
              </tbody>
            </OrdersTable>
          ) : (
            <NoOrdersMessage>No Orders Placed Yet</NoOrdersMessage>
          )}
        </Content>
      ) : (
        <p>Please log in to view your orders.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
`;

const NoOrdersMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

