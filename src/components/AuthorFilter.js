import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import {handleInputChange, handleSelection, handleViewMoreClick, handleViewLessClick, truncateText} from '../Functions';
import {useDispatch,useSelector } from 'react-redux';
export const AuthorFilter = ({authorData}) => {

  const dispatch = useDispatch();
  const {BookAuthor} = useSelector((state) => state.filter.filters);

    const [visibleLists, setvisibleLists] = useState(4);
    const [selectedLists, setselectedLists] = useState([]);
  

  return (
    <div>
        {authorData
          .sort((a, b) => {
            const isAllA = a.toLowerCase() === 'all';
            const isAllB = b.toLowerCase() === 'all';
        
            if (isAllA && !isAllB) {
              return -1; // 'all' comes first
            } else if (!isAllA && isAllB) {
              return 1; // 'all' comes first
            } else {
              return a.localeCompare(b); // sorting the rest
            }
          })
        .slice(0,visibleLists).map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="BookAuthor"
                value={curElem}
                className={curElem === BookAuthor ? "active" : ""}
                onClick={(e)=>handleInputChange(e,dispatch)}>
                {truncateText(curElem,17)}
              </button>
            );
          })}
        {authorData.length>visibleLists && (
          <Button onClick={()=>{handleViewMoreClick(visibleLists, setvisibleLists)}}>View More +</Button>
        )
        } 
        {visibleLists > 4 && (
              <Button onClick={()=>{handleViewLessClick(visibleLists, setvisibleLists)}}>View Less -</Button>
            )}
        </div>
  )
}
