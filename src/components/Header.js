import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { SearchBar } from './SearchBar';
import { useSelector,useDispatch } from 'react-redux';
import { sortbooks,filterexec } from "../Actions/filterActions";


export const Header = () => {
  const dispatch = useDispatch();
  const {status,isLoading,totalcount, books, error } = useSelector((state) => state.books);
  const {all_products, filter_products,sorting_value} = useSelector((state) => state.filter);
  const {text,genre,BookAuthor,price,avg_rating} = useSelector((state) => state.filter.filters);
 
  useEffect(() => {
    dispatch(sortbooks());
    dispatch(filterexec());
  }, [books,sorting_value,text,genre,BookAuthor,price,avg_rating]);

  return (
    <HeaderSection>
      <NavLink to="/">
        <div className='logo'>
        <img src="./images/logo.png" alt="BookNooks Logo"/>
        </div>
      </NavLink>
      <SearchBar/>
      <Nav/>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  padding: 3rem 3rem;
  height: 7.5rem;
  background-color: ${({ theme }) => theme.colors.featbg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

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