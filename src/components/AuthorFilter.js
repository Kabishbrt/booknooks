import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import {handleSelection, handleViewMoreClick, handleViewLessClick, truncateText} from '../Functions';

export const AuthorFilter = ({authorData}) => {

    const [visibleLists, setvisibleLists] = useState(4);
    const [selectedLists, setselectedLists] = useState([]);
  

  return (
    <div>
        {authorData.slice(0,visibleLists).map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={ "active"}
                onClick={()=>handleSelection(curElem)}>
                {truncateText(curElem,20)}
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
