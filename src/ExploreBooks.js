// Home.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GridView from './components/GridView';
import FilterSection from './components/FilterSection';
import Sort from './components/Sort';


export const ExploreBooks = () => {
  const {status,isLoading,totalcount, books, error } = useSelector((state) => state.books);
  const {} = useSelector((state) => state.filter);
  const {text,genre,BookAuthor,avg_rating,maxPrice,price} = useSelector((state) => state.filter.filters);
  console.log(text,genre,BookAuthor,avg_rating,maxPrice,price);
  if(isLoading){

  return(
    <p>Loading...</p>
  )
  }else{
  
    
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection books={books}/>
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort/>
          </div>
          <div className="main-product">
            {
              status ===200? (
                <GridView books={books} totalcount={totalcount}/>
              ):<p>Oops! Failed to load, Try again later.<br/>{error}</p>  
            }
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
  // return (
  //   <div>
  //     {isLoading ? (
  //       <p>Loading...</p>
  //     ) : status === 200 ? (
  //       books.map((book) => {
  //         const { _id, ISBN, BookTitle, ImageURLM, Price, avg_ratings } = book;
  //         return (
  //           <div key={_id}>
  //             <p>{BookTitle}</p>
  //             <img src={ImageURLM}/>
  //           </div>
  //         );
  //       })
  //     ) : (
  //       <p>Oops! Failed to load, Try again later.</p>
  //     )}


  //   </div>
  // );
};

const Wrapper = styled.section`
background-color: #f8f7f7;
padding: 10px;
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default ExploreBooks;