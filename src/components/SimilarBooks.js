import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import axios from "axios";
import styled from "styled-components";
import Card from './Card';

export const SimilarBooks = () => {
  const { title } = useParams();
  const API = "http://localhost:5000/suggest/";
  
  const [state, setState] = useState({ isLoading: true, books: [], status: 0 });

  useEffect(() => {
    axios.get(`${API}/${title}`)
      .then((res) => {
        setState({ isLoading: false, books: res.data.books, status: res.status });
      })
      .catch((err) => {
        console.error(err); 
        setState({ isLoading: false, books: null, status: 0 });
      });
  }, [title]); 

  if (state.isLoading === true) {
    return (
      <h1>Loading</h1>
    );
  }

  if (state.status === 200) {
    if (state.books) {
      console.log(state.books);

      return (
        // HTML section for Similar books
        <Wrapper className="section">
          <h2>People who viewed this book also viewed..</h2>
          <div className="container grid grid-four-column">
            {state.books.map((book) => {
              return <Card key={book._id} {...book} />;
            })}
          </div>
        </Wrapper>
      );
    } else {
      return (
        <h1>No Books Found</h1>
      );
    }
  }
};

const Wrapper = styled.div`
  h2 {
    text-align: center;
  }
  /* Add any additional styles for the wrapper if needed */
  .similar-books-card {
  }
  background-color: #f8f7f7;
  padding: 10px;
  .grid-filter-column {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 0.5fr;
    }
  }
`;
