import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { getStoredToken } from '../Actions/authActions';
import { fetchBooks } from '../Actions/bookActions';
const Checkout = styled.div`;
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
  .payment-option {
  cursor: pointer;
  width: 120px;
  border: 2px solid grey;
  @media only screen and (max-width: 768px) {
    width: 80px;
  }
}
.payment-option img {
  height: 60px; /* Default height for larger screens */
  width: 110px; /* Default width for larger screens */

  @media only screen and (max-width: 768px) {
    /* Adjust dimensions for smaller screens (e.g., mobile devices) */
    height: 40px;
    width: 80px;
  }
}

.payment-option:hover {
  border-color: #007bff; /* Highlight color on hover */
}

.payment-option.selected {
  border-color: #28a745; /* Highlight color for selected option */
}


`;
export const OrderSummary = ({checkout,totalPrice,shippingfee,multipleremove}) => {
    const {userid,isAuthenticated,Cart}=useSelector((state)=>state.auth);
    const [selectedOption, setSelectedOption] = useState(null);
    const [payoption, setPayoption] = useState(null);
    const dispatch = useDispatch();
    const handleOptionClick = (option) => {
        if (selectedOption === option) {
          // If the clicked option is already selected, unselect it
          setSelectedOption(null);
        } else {
          // Otherwise, select the clicked option
          setSelectedOption(option);
          setPayoption(option);
        }
      };
    // const esewaCall = (order) => {
    //     console.log(order);
    //     var path = "https://uat.esewa.com.np/epay/main";
        
    //     var params = {
    //         amt: order.SubTotal,
    //         psc: 0,
    //         pdc: 0,
    //         txAmt: 0,
    //         tAmt: order.SubTotal,
    //         pid: order._id,
    //         scd: "EPAYTEST",
    //         su: "http://localhost:5173/cart",
    //         fu: "http://localhost:5173/"
    //     }

    //     console.log(params);

    //     var form = document.createElement("form");
    //     form.setAttribute("method", "POST");
    //     form.setAttribute("action", path);

    //     for (var key in params) {
    //         var hiddenField = document.createElement("input");
    //         hiddenField.setAttribute("type", "hidden");
    //         hiddenField.setAttribute("name", key);
    //         hiddenField.setAttribute("value", params[key]);
    //         form.appendChild(hiddenField);
    //     }

    //     document.body.appendChild(form);
    //     form.submit();
    // }
    const esewaCall = (formData) => {
        var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);
        for (var key in formData) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute( "value", formData [key]);
          form.appendChild(hiddenField);
        }
        document.body.appendChild (form);
        form.submit();
      };


    const createorder = async (payload,totalPrice,userid) => {
        const orderProducts = payload.map((item) => (
            {
                BookId: item.itemId,
                Quantity: item.quantity,
                Price: item.price
            }
        ));
    
        const orderData = {
            UserID: userid,
            OrderDate: new Date(),
            Status: 'Unpaid',
            Products: orderProducts,
            SubTotal: totalPrice,
        };
    
        
    
        try {
            const token = getStoredToken();
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/orders`,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(response.status===201){
              multipleremove(checkout,userid,Cart);
                    if(payoption==='esewa'){
                      esewaCall(response.data.formData);
                    }
                    dispatch(fetchBooks());
            }
            

        } catch (error) {
            alert(error.response.data.message);
        }
          
    }
    if(isAuthenticated){
        return (
            <Checkout>
            <p className='title'>Order Summary</p>
            <div className='checkoutcontainer'>
        
              <span className='total'>
                  Items: {(checkout!=null)?checkout.length:0}
              </span>
              <span className='total'>
                  Shipping Fee: {shippingfee}
              </span>
              <span className='total'>
                Total Price: {totalPrice}
              </span>
            <div>
              {(checkout && checkout.length>0)?(
                <div className='total'>
                        {/* <div
                            className={`payment-option ${selectedOption === 'option1' ? 'selected' : ''}`}
                            onClick={() => handleOptionClick('option1')}
                        >
                            <img src="path/to/option1-image.jpg" alt="Option 1" />
                        </div> */}
                        <div
                            className={`payment-option ${selectedOption === 'esewa' ? 'selected' : ''}`}
                            onClick={() => handleOptionClick('esewa')}
                        >
                            <img src="/payment.png" alt="esewa"/>
                        </div>
                      {(selectedOption!==null)?(

                        <button className='buy' onClick={()=>createorder(checkout,totalPrice,userid)}>Proceed to buy</button>
                      ):(
                        <h3><i>Select Payment option to proceed</i></h3>
                      )}
                </div>
                    )
              :(<h3><i>Select books to Proceed</i></h3>)}
        
            </div>
            </div>
          </Checkout>
        )
    }else{
        return <h2>Login</h2>
    }
 
}
