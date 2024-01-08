import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { SearchBar } from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { sortbooks, filterexec } from '../Actions/filterActions';

export const Header = () => {
  const { Initializing } = useSelector((state) => state.auth);

  return (
    <StyledHeaderSection initializing={Initializing}>
      <NavLink to="/">
        <div className='logo'>
          <img src="./images/logo.png" alt="BookNooks Logo" />
        </div>
      </NavLink>
      <SearchBar />
      <Nav />
    </StyledHeaderSection>
  );
};

const StyledHeaderSection = styled.section`
  padding: 3rem 3rem;
  height: 7.5rem;
  background-color: ${({ theme }) => theme.colors.featbg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  filter: ${({ initializing }) => (initializing ? 'blur(5px)' : 'none')}; // Apply blur conditionally
  pointer-events: ${({ initializing }) => (initializing ? 'none' : 'auto')}; // Disable pointer events conditionally


  .logo {
    padding-right: 10px;
    padding-top: 6px;

    img {
      width: 170px;
      height: auto;
      margin-top: 3px;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 1rem;
    .logo {
      margin-left: 0rem;
      padding-right: 10px;

      img {
        width: 120px;
        height: auto;
      }
    }
  }
`;
