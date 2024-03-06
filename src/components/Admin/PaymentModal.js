import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { fetchBooks } from '../../Actions/bookActions';
import {useDispatch} from 'react-redux';
import { getStoredToken } from '../../Actions/authActions';
import { useParams } from "react-router-dom";
const ManagePaymentsContainer = styled.div`
  text-align: center;
  font-size: 11px;
`;

const TableContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const StyledTableHeader = styled.th`
  height: 40px;
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTableCell = styled.td`
  height: 40px;
  border: 1px solid #ddd;
  padding: 8px;
`;


export const PaymentModal = () => {
  const {orderId} = useParams();
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [editPaymentData, setEditPaymentData] = useState(null);
  const authToken = getStoredToken();

  const fetchPayments = async (orderId) => {
    try {
      setIsLoading(true);
      const uri = `${process.env.REACT_APP_API_URL}/esewa/${orderId}/`;
      const response = await fetch(uri,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }

      if(response.ok){

        const data = await response.json();
        setPayments(data); // Assuming the API response is an array of payment objects
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(orderId);
  }, [orderId]);

if(payments.length>0){
  return (
    <ManagePaymentsContainer>
      <TableContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>Order ID</StyledTableHeader>
                <StyledTableHeader>Source</StyledTableHeader>
                <StyledTableHeader>Amount</StyledTableHeader>
                <StyledTableHeader>UserID</StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <StyledTableCell>{payment.orderID}</StyledTableCell>
                  <StyledTableCell>{payment.source}</StyledTableCell>
                  <StyledTableCell>{payment.amount}</StyledTableCell>
                  <StyledTableCell>{payment.UserID}</StyledTableCell>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        )}
      </TableContainer>
    </ManagePaymentsContainer>
  );
              }else if(payments.length==0){
                return <h2 style={{textAlign:'center'}}>Payment Not Recieved</h2>;
              }
};
