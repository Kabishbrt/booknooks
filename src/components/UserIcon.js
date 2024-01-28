import React, { useState,useEffect, useRef } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import styled from 'styled-components';
import {useDispatch } from 'react-redux';
import { logout } from '../Actions/authActions';

const UserIconContainer = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

  .LogoutButton{
    margin-top:6px;
    font-size: 1.4rem;
    padding: 8px;
    text-decoration: none;
    cursor: pointer;
    background-color: #eee;
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;

    &:hover {
        background-color: ${({ theme }) => theme.colors.cart};
        border: 1px solid black;
        border-radius: 10px;
        color: white;
        width: 100%;
    }
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartTrolley = styled(FaRegUser)`
  // Add any additional styles for the user icon here
  margin-right: 8px;
`;

const CartTotalItem = styled.span`
  // Add any additional styles for the cart total item here
`;

const DropdownMenu = styled.div`
  
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  padding:2px;
  width:70px;
  overflow:hidden;  
  background-color: white;
  border: 1px solid black;
  border-radius : 10px;
  margin-top: 10px;
  font-size: 1.5rem;
  margin-left:-18px;
  // Add other styling for the dropdown menu
  @media screen and (max-width:1130px){
    margin-left: -40px;
  }
`;

const StyledNavLink = styled(NavLink)`
  // Add any additional styles for the navigation links here
  display: block;
  padding: 8px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #eee;
    border: 1px solid black;
    border-radius: 10px;
  }
`;

const UserIcon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleUserIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click occurred outside the dropdown, close it
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <UserIconContainer ref={dropdownRef}>
      <IconWrapper className="navbar-link cart-trolley--link" onClick={handleUserIconClick}>
        <CartTrolley className="cart-trolley" />
      </IconWrapper>

      <DropdownMenu isOpen={isDropdownOpen}>
        <StyledNavLink to="/orders" onClick={() => setDropdownOpen(false)}>
          Orders
        </StyledNavLink>
        <StyledNavLink to="/details" onClick={() => setDropdownOpen(false)}>
          Details
        </StyledNavLink>
        <StyledNavLink to="/security" onClick={() => setDropdownOpen(false)}>
          Security
        </StyledNavLink>
        <button
          className="LogoutButton"
          onClick={() => {
            localStorage.setItem('hasShownAlert', 'false');
            dispatch(logout(() => navigate('/login')));
          }}
        >
          Log Out
        </button>
      </DropdownMenu>
    </UserIconContainer>
  );
};
export default UserIcon;
