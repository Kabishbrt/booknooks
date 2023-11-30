// SearchBar.js
import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { handleInputChange } from '../Functions';

export const SearchBar = () => {
  const { text } = useSelector((state) => state.filter.filters);
  const dispatch = useDispatch(); // Corrected: useDispatch is a hook, so it should be invoked as a function
  
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        name="text"
        value={text}
        onChange={(e) => handleInputChange(e, dispatch)}
        placeholder="Search "
      />
      <SearchButton>
        <AiOutlineSearch />
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  margin-top: 4px;
  align-items: center;
  

  @media (max-width: 1100px) {
    gap: 0.5rem;
    flex-direction: row;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 6px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  width: 300px;
  margin-left: 20px;
  margin-right: 8px;
  background-size: 20px 20px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  @media (max-width: 1100px) {
    width: 70%; // Take up the full width on smaller screens
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const SearchButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #267bb8;
  }

  svg {
    font-size: 20px;
  }
  @media (max-width: 1100px) {
    margin-top: 2px;
    height: 30px;
    justify-content: center;
    
    svg {
        
        font-size: 15px;
      }
  }
`;

// Other components and styles remain unchanged
