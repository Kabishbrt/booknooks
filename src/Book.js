import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Ratings from "./components/Ratings";
import { Button } from "./styles/Button";

import { useParams } from "react-router-dom";
export const Book = () => {
  const [State, setState] = useState({ isLoading: true, book: [], status: 0 });

  //Increasing or Decreasing the quantity and addding it to the cart
  const [quantity, setQuantity] = useState(1); // Initialize with 1 as the default quantity
  const [cart, setCart] = useState([]);
  const addToCart = () => {
    // Check if the quantity is within the available stock
    if (quantity <= State.book.Stock) {
      // Add the book to the cart with the selected quantity
      const bookInCart = { ...State.book, quantity };
      setCart([...cart, bookInCart]);
      alert(`Added ${quantity} ${State.book.BookTitle} to the cart`);
    } else {
      alert("Selected quantity exceeds available stock");
    }
  };

  const { title } = useParams();
  const API = "http://localhost:5000/books/single";
  useEffect(() => {
    axios
      .get(`${API}/${title}`)
      .then((res) => {
        setState({ isLoading: false, book: res.data.book, status: res.status });
      })
      .catch((err) => {
        console.error(err); // Log the error if needed
        setState({ isLoading: false, book: null, status: 0 });
      });
  }, []);

  if (State.isLoading === true) {
    return <h2>Loading....</h2>;
  }
  if (State.status === 200) {
    if (State.book) {
      const {
        _id,
        ISBN,
        BookTitle,
        BookAuthor,
        YearOfPublication,
        Publisher,
        ImageURLL,
        Price,
        Stock,
        ratings,
        genre,
      } = State.book;
      return (
        <SingleBookPage>
          <div className="container book-details-container">
            <img className="book-details-img" src={ImageURLL} alt={BookTitle} />
            <div className="book-details-content">
              <h1 className="book-details-title">{BookTitle}</h1>
              <p className="book-details-genre">
                Genre: <a href="#">{genre}</a>
              </p>
              <div>
                <Ratings value={3.2} />
              </div>

              <p className="book-details-author">Author: {BookAuthor}</p>
              <p className="book-details-year">
                Year of Publication: {YearOfPublication}
              </p>
              <p className="book-details-publisher">Publisher: {Publisher}</p>
              <p className="book-details-isbn">ISBN: {ISBN}</p>
              <p className="book-details-price">Price: ${Price}</p>
              <p className="book-details-stock">Available Quantity: {Stock}</p>
              <div className="quantity-input">
                <Button
                  className="decrease-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 0))
                  }
                />
                <Button
                  className="increase-btn"
                  onClick={() => setQuantity(Math.min(Stock, quantity + 1))}
                >
                  +
                </Button>
              </div>
              <Button className="add-to-cart-btn">Add to Cart</Button>
            </div>
          </div>
        </SingleBookPage>
      );
    } else {
      return <h1>No Books Found</h1>;
    }
  }
};

const SingleBookPage = styled.div`
  margin-top:30px;
  .book-details-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;

    /* Adjust grid for larger screens */
    @media screen and (min-width: ${({ theme }) => theme.media.tab}) {
      grid-template-columns: 1fr 2fr;
    }
  }

  a:hover {
    color: red;
  }
  .book-details-img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .book-details-content {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px #267bb8;

    color: ${({ theme }) => theme.colors.text};
  }

  .book-details-title {
    font-size: 3.2rem;
    margin-bottom: 10px;
  }

  .book-details-author,
  .book-details-year,
  .book-details-publisher,
  .book-details-isbn,
  .book-details-price,
  .book-details-stock {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  .quantity-input {
    display: flex;
    align-items: center;
    margin-top: 10px;

    input {
      width: 40px;
      text-align: center;
      font-size: 1.6rem;
      border: 1px solid ${({ theme }) => theme.colors.border};
      padding: 5px;
    }
  }

  .add-to-cart-btn {
    background-color: #267bb8;
    color: #fff;
    padding: 10px 15px;
    font-size: 1.6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    /* Add hover effect */
    &:hover {
      background-color: red;
    }
  }
  .increase-btn,
  .decrease-btn {
    background-color: #267bb8;
    color: #fff;
    padding: 5px 10px;
    font-size: 1.6rem;
    border: none;
    border-radius: 2px;
    margin: 10px 5px 10px 5px;
    cursor: pointer;
  }
`;
