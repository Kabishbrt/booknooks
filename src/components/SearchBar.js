import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { handleInputChange } from '../Functions';
import { NavLink, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [localText, setLocalText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLocalText(e.target.value);
  };

  const handleSearchClick = (e) => {
    if(localText===""){
      alert("Empty SearchBar")
    }else{
      handleInputChange(
        { target: { name: 'text', value: localText } },
        dispatch
      ); 
    }

    // Add additional logic or dispatch here if needed
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        name="text"
        value={localText}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Search"
      />
      <NavLink to="/explore">
      <SearchButton type="button" onClick={handleSearchClick}>
        <AiOutlineSearch />
      </SearchButton>
      </NavLink>
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


//this is for automatic search
// export const SearchBar = () => {
//   const [localText, setLocalText] = useState('');
//   const dispatch = useDispatch();

//   const handleLocalInputChange = debounce((e) => {
//     handleInputChange(e, dispatch); // Pass the event to handleInputChange
//   }, 300);

//   const handleChange = (e) => {
//     setLocalText(e.target.value);
//     handleLocalInputChange(e); // Pass the event to debounce function
//   };

//   return (
//     <SearchContainer>
//       <SearchInput
//         type="text"
//         name="text"
//         value={localText}
//         onChange={handleChange}
//         placeholder="Search "
//       />
//       <SearchButton>
//         <AiOutlineSearch />
//       </SearchButton>
//     </SearchContainer>
//   );
// };


// const SearchContainer = styled.div`
//   display: flex;
//   margin-top: 4px;
//   align-items: center;
  

//   @media (max-width: 1100px) {
//     gap: 0.5rem;
//     flex-direction: row;
//     align-items: stretch;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 6px;
//   border: 2px solid #ddd;
//   border-radius: 6px;
//   font-size: 16px;
//   width: 300px;
//   margin-left: 20px;
//   margin-right: 8px;
//   background-size: 20px 20px;

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//   }

//   @media (max-width: 1100px) {
//     width: 70%; // Take up the full width on smaller screens
//     margin-left: 0;
//     margin-right: 0;
//     margin-bottom: 8px;
//   }
// `;

// const SearchButton = styled.button`
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   padding: 8px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #267bb8;
//   }

//   svg {
//     font-size: 20px;
//   }
//   @media (max-width: 1100px) {
//     margin-top: 2px;
//     height: 30px;
//     justify-content: center;
    
//     svg {
        
//         font-size: 15px;
//       }
//   }
// `;

// // Other components and styles remain unchanged
