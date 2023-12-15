import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink } from "react-router-dom";



export const FeaturedBooks = () => {
    const [State, setState] = useState({isLoading: true,books: [],status:0})
   const API = "http://localhost:5000/books/featured"
    useEffect(() => {
        axios.get(`${API}`)
          .then((res) => {
            setState({ isLoading: false, books: res.data.books, status: res.status });
          })
          .catch((err) => {
            console.error(err); // Log the error if needed
            setState({ isLoading: false, books: null, status: 0 });
          });
      }, []);

     
      if(State.isLoading===true){
          return(
              <h1>Loading</h1>
          )
      }
    if(State.status===200){


        if(State.books){
            console.log(State.books)

        
            /*return(
            //html section for featured books
                <Wrapper>
                    <div>
                        <h2>FeaturedBooks</h2>
                        {State.books.map((book) => (
                        <div key={book._id}>
                            <h3>{book.BookTitle}</h3>
                            <img src={book.ImageURLM} alt={book.BookTitle} />
                            <p>Price: {book.Price}</p>
                        </div>
                        ))}
                    </div>
                </Wrapper>
            );*/

            return(
                <Wrapper className="page-container">
                  <div className="feature-section">
                    <div className="books-container">
                      <div className="common-heading">Featured Books</div>
                      <div className="grid grid-four-column">
                        {State.books.map((book) => (
                          <NavLink key={book._id} to={`/Book/${book.BookTitle}`} className="nav-link">
                            <div key={book._id} className="book-item">                           
                              <img src={book.ImageURLM} alt={book.BookTitle} />
                              <h3>{book.BookTitle}</h3>
                              <p>Price: {book.Price}</p>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>                 
                </Wrapper>
            );            
        }

        else{
            return(
                <h1>No Books Found</h1>
            );
        }
    };
};

const Wrapper = styled.section`

.page-container {
  width: 100%;
  background-color: #f8f8f8; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.feature-section {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px; /* Set a maximum width to prevent it from becoming too wide */
  margin: 0 auto;
  margin: 20px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out; 
}

.feature-section:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.books-container {
  text-align: center;
}

.common-heading {
  text-align:left;
  font-size: 4em;
  margin-bottom: 20px;
  color: #333;
}

.grid {
  display: grid;
  gap: 80px;
}

.grid-four-column {
  grid-template-columns: repeat(4, 1fr);
}

.book-item {
  text-align: center;
  padding: 15px;
  border: 1px solid #ddd; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out; 
}

.book-item:hover {
  background-color: ${({ theme }) => theme.colors.helper};
  transform: scale(1.05); 
}

.book-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

/* Responsive Styles */

@media screen and (max-width: 768px) {
  .grid-four-column {
    grid-template-columns: repeat(2, 2fr);
  }
}

@media screen and (max-width: 480px) {
  .grid-four-column {
    grid-template-columns: 1fr;
  }
}
`;
