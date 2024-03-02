import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoredToken, logout, logouts } from '../../Actions/authActions';
import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import { truncateText } from '../../Functions';


export const ManageOrders = () => {
  const { userid, loginalert, Initializing, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [status, setStatus ]=useState();
  const authToken = getStoredToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // ... (existing code)

  const handleViewOrderClick = (orderId) => {
    setPaymentModalOpen(true);
    setSelectedOrderId(orderId);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders/`, {
        method: 'GET',
        // ... (Optional headers, e.g., Authorization with authToken)
      });
      if (!response.ok) {
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
  useEffect(() => {

    if (Initializing === false /*&& loginalert && authToken*/) {
      fetchOrders();
    }
  }, [userid, loginalert, authToken]);

  
const handleremove= async (order,bookid)=>{
  // console.log(order);
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
    fetchOrders();
    
  }catch(err){
    alert(err.response.data.message);
  }

}

  const flag = true;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredOrders = orders.order?.filter((order) => {
    if (!searchQuery) return true; // Show all orders if no search query
    return order.Products.some((book) => {
      const bookTitle = book.BookId.BookTitle.toLowerCase();
      const bookId = book.BookId._id;
      const uid = order.UserID;
      const oid = order._id;
    
      return bookTitle.includes(searchQuery) || oid.toString().includes(searchQuery) || uid.toString().includes(searchQuery);
    });
  });


  const handlerStatusChange = async (orderId, value) => {
    try {
      // Make an API call or update the status locally, depending on your implementation
      // For now, we will just update it locally
      const updatedOrders = orders.order.map((order) =>
        order._id === orderId ? { ...order, Status: value } : order
      );
  
      // Find the updated order
      const updatedOrder = updatedOrders.find((order) => order._id === orderId);
  
      // Update the state with the new status and orders
      setStatus(value);

      // Log the details of the updated order
      console.log('Updated Order:', updatedOrder);

      try{
        const API=`${process.env.REACT_APP_API_URL}/orders/${userid}/${orderId}`;
        console.log(API);
        const response = await fetch(API,{
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOrder)
        });
        if(response.status===200){
          alert("Successfully updated Order Status")
        }
        const data = await response.json();

        fetchOrders();
      }catch(err){
        alert(err.response.data.message);
      }
 


      setOrders({ ...orders, order: updatedOrders });
  
  
      // You can call an API here to update the order status on the server if needed
      // Example: await updateOrderStatus(orderId, value);
  
      console.log(`Order ${orderId} status changed to ${value}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if(isAuthenticated){

    
      return (
        <Container>
          {/*userid && authToken*/ flag? (
            <Content>
              <br></br>
              <input
                type="text"
                placeholder="Search orders"
                id="searchInput"
                onChange={handleSearchChange}
              />
              <br></br><br></br>
              {filteredOrders && filteredOrders.length > 0 ? (
                <OrdersTable>
                  <thead>
                    <tr>
                      <TableHeader>Order</TableHeader>
                      <TableHeader>Order Date</TableHeader>
                      <TableHeader>UserID</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Total</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.slice().reverse().map((order) => (
                      <tr key={order._id}>
    
                        <TableCell>
                        <div className='grid-two'>
                        {
                          
                        order.Products.map((book)=>(
                          <>
                            {/* <NavLink to={`/Book/${encodeURIComponent(book.BookId.BookTitle)}`}  className="nav-link">
                           <img src={book.BookId.ImageURLS}></img>
                           </NavLink> */}
                           <NavLink to={`/Book/${encodeURIComponent(book.BookId.BookTitle)}`}  className="nav-link">
                           <p>{truncateText(book.BookId.BookTitle,30)} <br></br><p>Quantity:{book.Quantity}</p></p>
                           </NavLink>
                           <div>
                           {(book.Status=='Cancelled' || order.Status=='Cancelled')?(<p className='remove'>Cancelled</p>):('')}
                           {(order.Status!=='Cancelled')?(
                            (book.Status!=='Cancelled')?(
                              (order.Status!=='Delivered')?(
                                <>
                                
                                <a href="#" className='remove' onClick={()=>handleremove(order,book.BookId._id)}>Cancel</a>
                                
                              </>
                              ):('')
         
                            ):('')
                              
                           ):('')}
                           <a href="#" className='remove' onClick={()=>alert("OrderID: " + order._id)}>View Order ID</a>
                           </div>
     
                           </>
                        ))
                        }
                        </div>
                        <NavLink to={`payment/${order._id}`}>
                              View Payment
                            </NavLink>
                        </TableCell>
                        
                        <TableCell>
                            <p>{new Date(order.OrderDate).toLocaleDateString()}<br></br>
                            {new Date(order.OrderDate).toLocaleTimeString()}</p>
                        </TableCell>
                        <TableCell><p>{order.UserID}</p></TableCell>
                        <TableCell>
                          
                          <select
                        value={order.Status}
                        onChange={(e) => handlerStatusChange(order._id, e.target.value)}
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Processing">Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select></TableCell>
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
  }else{
    return "";
  }
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
    width: 200px; /* Set a specific width for the first header */
  }
  &:nth-child(2) {
    width: 100px; /* Set a specific width for the second header */
  }
  &:nth-child(3) {
    width: 20px; /* Set a specific width for the second header */
  }
  &:nth-child(4) {
    width: 100px; /* Set a specific width for the second header */
  }
  &:nth-child(5) {
    width: 10px; /* Set a specific width for the second header */
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
  select{
    @media only screen and (max-width: 768px) {
      font-size: 11px;
     
    }
  }
  .grid-two{
    display: grid;
    grid-template-columns: 0.5fr 0.25fr ;  
    row-gap: 10px;
    column-gap:40px;
    @media only screen and (max-width: 768px) {
      grid-template-columns: 0.50fr 0.25fr;
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

    height: 4 0%;
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


