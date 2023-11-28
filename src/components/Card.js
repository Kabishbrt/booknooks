import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Card = (book) => {
    const { _id, ISBN, BookTitle, ImageURLM, Price, avg_rating} = book;
  return (
    <Wrapper>
    <NavLink to={`/single/${_id}`}>
      <div className="card">
        <figure>
          <img src={ImageURLM} alt="Image not available" />
          <figcaption className="caption">{avg_rating.toFixed(1)}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <span className="booktitle">{BookTitle}</span>
            <p className="card-data--price">{Price}<h5>NPR</h5></p>
          </div>
        </div>
      </div>
    </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`

  .card {
    background-color: ${({ theme }) => theme.colors.cardbg};
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */
    overflow: hidden;

    &:hover{
        background-color: ${({ theme }) => theme.colors.helper};

        h3{
            color: white;
        }
        .card-data--price{
            padding:5px;
            color: white;
        }
        .booktitle{
            color: ${({ theme }) => theme.colors.white}
        }
      }

    .card-data {
      
      padding: 0 2rem;
    }

    .card-data-flex {
      height:9rem;
      margin: ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
    }

    h3 {
      text-transform: capitalize;
      margin-bottom:12px;
      color: ${({ theme }) => theme.colors.black};
    }
    h5{
        margin-left:1px;
    }

    .card-data--price {
      margin-bottom:2px;
      color: ${({ theme }) => theme.colors.black};
    }

    

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1000px) {
    .card{
      
    }
  }
`;

export default Card;