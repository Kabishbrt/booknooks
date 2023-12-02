import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { handleSelection, handleViewMoreClick, handleViewLessbook, truncateText } from "../Functions";
import { Button } from "../styles/Button";


const GridView = ({ books, totalcount }) => {
  const [visibleLists, setvisibleLists] = useState(16);
  const [selectedLists, setselectedLists] = useState([]);

  const handleViewMore = () => {
    handleViewMoreClick(visibleLists, setvisibleLists);
  };

  const handleViewLess = () => {
    handleViewLessbook(visibleLists, setvisibleLists);
  };

  return (
    <Wrapper className="section">
      <div className="container grid grid-four-column">
        {books.slice(0, visibleLists).map((book) => {
          return <Card key={book._id} {...book} />;
        })}
      </div>
      <br/>
      <div className="viewbuttons">
        <div>
      {books.length > visibleLists && (
        <Button onClick={handleViewMore}>View More +</Button>
      )}
      </div>
      <div>
      {visibleLists > 16 && (
        <Button onClick={handleViewLess}>View Less -</Button>
      )}
      </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }
  .viewbuttons{
    display:flex;
    justify-content:space-between;
  }
`;

export default GridView;
