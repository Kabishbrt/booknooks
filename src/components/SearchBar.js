// SearchBar.js
import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="Search books..." />
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
`;

const SearchInput = styled.input`
  padding: 6px; // Decreased height
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  width: 300px; // Adjust the width as needed
  margin-left: 20px;
  margin-right: 8px;
  background-size: 20px 20px; // Set the size of the background image

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px; // Decreased height
  transition: background-color 0.3s ease; // Added transition for smooth hover effect

  &:hover {
    background-color: #267bb8; // Change the color on hover
  }

  svg {
    font-size: 20px; // Adjusted size
  }
`;

// Other components and styles remain unchanged
