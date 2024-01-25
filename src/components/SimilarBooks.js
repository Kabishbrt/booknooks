import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import axios from "axios";
import styled from "styled-components";
import GridView from "./GridView";


export const SimilarBooks = () => {
  const { title } = useParams();
  const API = "http://localhost:5000/suggest/";

  const [state, setState] = useState({ isLoading: true, books: [], status: 0 });

  useEffect(() => {
    axios
      .get(`${API}/${title}`)
      .then((res) => {
        setState({
          isLoading: false,
          books: res.data.books,
          status: res.status,
        });
      })
      .catch((err) => {
        console.error(err);
        setState({ isLoading: false, books: null, status: 0 });
      });
  }, []); 

  if (state.isLoading === true) {
    return <h1>Loading</h1>;
  }

  if (state.status === 200) {
    if (state.books) {
      console.log(state.books);

      return (
        // HTML section for Similar books
        <Wrapper className="section">
          <h2>People who Viewed this book also viewed.</h2>
          <GridView books={state.books} />
        </Wrapper>
      );
    } else {
      return <h1>No Books Found</h1>;
    }
  }
};

const Wrapper = styled.section`
  h2 {
    text-align: center;
  }
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 0.5fr;
    }
  }
`;
