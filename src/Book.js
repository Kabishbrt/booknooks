import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Ratings from "./components/Ratings";
import { Button } from "./styles/Button";
import { SimilarBooks } from './components/SimilarBooks';
import { useParams } from "react-router-dom";
import { getStoredToken } from "./Actions/authActions";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
export const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [State, setState] = useState({ isLoading: true, book: [], status: 0 });
  const {userid, Cart, isAuthenticated} = useSelector((state)=>state.auth);
  //Increasing or Decreasing the quantity and addding it to the cart
  const [quantity, setQuantity] = useState(0); // Initialize with 1 as the default quantity



  const { title } = useParams();
  const encodedTitle = encodeURIComponent(title);
  
  const API = `${process.env.REACT_APP_API_URL}/books/single`;
  useEffect(() => {
    setState({ isLoading: true})
    axios
      .get(`${API}/${encodedTitle}`)
      .then((res) => {
        setState({ isLoading: false, book: res.data.book, status: res.status });
        
      })
      .catch((err) => {
        console.error(err); // Log the error if needed
        setState({ isLoading: false, book: null, status: 0 });
      });
      
  }, [title]);

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

      const CartHandler =async(e)=>{
        e.preventDefault();
        if(quantity>0){

        
        try{
          setState({isLoading:true})
        const API =`${process.env.REACT_APP_API_URL}/cart/`;
        const token = getStoredToken();
        const response = await axios.post(`${API}`,{userId:userid, itemId: _id, quantity:quantity},{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })

        if(response.status===200){
            dispatch({
              type: 'CART_UPDATE',
              payload: 
              {
                cart: response.data.items || [],
              },
            });
            setState({isLoading:false})
            //also update the available quantity
          }else{
            setState({isLoading:false})
            navigate('/');
          }
          navigate('/cart');
        }catch(error){
          alert(error.message);
          setState({isLoading:false})
        }
        
      }else{
        alert('Quantity Required');
      }
      }
      const calculate_avg_rating = (ratings)=>{
        if(ratings.length>0){

          const ratingval = ratings.map((rate)=>Number(rate.BookRating));
          console.log(ratingval)
          const sum = ratingval.reduce((acc,val)=>{
            return acc + val;
          },0)
          return parseFloat(sum/ratings.length).toPrecision(2);
        }
        return 0;
      }
      const avg= Number(calculate_avg_rating(ratings));

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
                <Ratings value={avg} />
              </div>

              <p className="book-details-author">Author: {BookAuthor}</p>
              <p className="book-details-year">
                Year of Publication: {YearOfPublication}
              </p>
              <p className="book-details-publisher">Publisher: {Publisher}</p>
              <p className="book-details-isbn">ISBN: {ISBN}</p>
              <p className="book-details-price">Price: Rs.{Price}</p>
              <p className="book-details-stock">Available Quantity: {Stock}</p>
              <div className="quantity-input">
                <Button
                  className="decrease-btn"
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
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
              {
                (isAuthenticated)?(
                  <Button onClick={(e)=>CartHandler(e)} className="add-to-cart-btn">Add to Cart</Button>
                ):(<h3><Button onClick={()=>navigate('/login')}>Login to buy</Button></h3>)
              }

            </div>
          </div>
          <h3>Recommendation is disabled for now</h3>
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
    height: 520px;
    align:center;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      height: 300px;
      margin: 0 auto; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
    }
  }

  .book-details-content {
    background-color: #f5f5f5;
    padding: 20px;
    height:520px;
    border-radius: 8px;
    box-shadow: 0 0 10px #267bb8;
    @media (max-width: 768px) {
      height: 420px;
    }

    color: ${({ theme }) => theme.colors.text};
  }

  .book-details-title {
    font-size: 3.2rem;
    margin-bottom: 10px;
    @media (max-width: 1200px) {
      font-size: 2.2rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }


  }

  .book-details-author,
  .book-details-year,
  .book-details-publisher,
  .book-details-isbn,
  .book-details-price,
  .book-details-stock {
    font-size: 2.2rem;
    margin-bottom: 10px;


    @media (max-width: 1200px) {
      font-size: 2.2rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
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
  .caption{
    display:none;
  }
`;
