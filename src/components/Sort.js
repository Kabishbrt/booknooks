import React, { useEffect } from "react";
import styled from "styled-components";
import { handleInputChange, sort } from "../Functions";
import { useSelector,useDispatch } from 'react-redux';
import { sortbooks } from "../Actions/filterActions";

const Sort = ({totalcount}) => {

  
  const dispatch = useDispatch();
  
   const {text,genre,BookAuthor,avg_rating,maxPrice,price} = useSelector((state) => state.filter.filters);
 
const sentence = `
${totalcount} Book${totalcount !== 1 ? 's' : ''} Available${text ? ` of "${text}"` : ''}${text && genre && genre !== 'all' ? ',' : ''}${!text && genre && genre !== 'all' ? ' of' : ''}${genre && genre !== 'all' ? ` "${genre}"` : ''}${!text && (genre === 'all') && BookAuthor !== 'all' ? ' of' : ''}${text && genre && BookAuthor !== 'all' ? ',' : ''}${BookAuthor && BookAuthor !== 'all' ? ` "${BookAuthor}"` : ''}.
`;
 
  


  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}

      <div className="product-data">
        <p>
        {sentence}
        </p>
      </div>

      {/* 2nd column  */}
      <div className="sort-selection">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sort"></label>
          <select
            name="sorting_value"
            id="sort"
            className="sort-selection--style"
            onChange={(e)=>sort(e,dispatch)}
          >
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;