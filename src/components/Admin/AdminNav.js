import React from 'react'
import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom";

const Nav = styled.nav`
  background-color: #356dab;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  .menu{
    color: ${({theme})=>theme.colors.productpagebg};
    &:hover{
      color: ${({theme})=>theme.colors.helpers};
      text-decoration: underline;
    }
  }
`;
export const AdminNav = () => {

  return (
    <Nav>
        <div>
            <NavLink to='/admin/managebooks'>
          <span className='menu'>
            Manage Books
          </span>
            </NavLink>
        </div>
        <div>
            <NavLink to='/admin/manageorders'>
          <span className='menu'>
            Manage Orders
          </span>
            </NavLink>
        </div>
        <div>
            <NavLink to='/admin/manageusers'>
          <span className='menu'>
            Manage Users
          </span>
            </NavLink>
        </div>
 
      </Nav>
  )
}
