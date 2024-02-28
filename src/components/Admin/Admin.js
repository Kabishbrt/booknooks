import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
const Details = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  > div {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

export const Admin = () => {
  return (
    <>

      <Details>
        <div>Total Books : 706</div>
        <div>Total Orders: 14</div>
        <div>Total Users: 2212123</div>
      </Details>
      {/* <h2 style={{textAlign:'center'}}>Dashboard</h2> */}
    </>
  );
};
