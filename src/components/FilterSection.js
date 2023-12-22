import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { Button } from "../styles/Button";
import { useEffect, useState } from "react";
import { AuthorFilter } from "./AuthorFilter";
import { useSelector,useDispatch } from 'react-redux';
import {handleSelection,handleInputChange, handleViewMoreClick, handleViewLessClick, truncateText} from '../Functions';
import { clearFilters, updateFilterValue,sortbooks, filterexec } from "../Actions/filterActions";


const FilterSection = (books) => {

  const dispatch = useDispatch();
  const {all_products, filter_products,sorting_value} = useSelector((state) => state.filter);
  const {text,genre,BookAuthor,avg_rating,maxPrice,price,minPrice} = useSelector((state) => state.filter.filters);
  console.log(genre,BookAuthor,avg_rating,maxPrice,price,text,sorting_value);

  
 

  const booksarray = books.books;
  const getUniqueData = (arrayofbooks, attr) => {
    let newVal = arrayofbooks.map((book) => {
      return book[attr];
    });
  
    // Create an array with unique values, including "all" at the beginning
    return (newVal = ["all", ...new Set(newVal)]);
  }
  const genreData = getUniqueData(booksarray, "genre");
  
  const authorData = getUniqueData(booksarray, "BookAuthor");
//   const colorsData = getUniqueData(all_products, "colors");
//console.log(colorsData.flat())



  const [visibleLists, setvisibleLists] = useState(4); // Initially, show 4 genres  
  const [selectedLists, setselectedLists] = useState([]);
  return (
    
    <Wrapper>
    <div className="filters">
    <div className="filter-clear">
        <Button className="btn" onClick={()=>dispatch(clearFilters(maxPrice))}>
          Clear Filters
        </Button>
      </div>
      <div className="filter_price">
        <h3><b>Price</b></h3>
        <p>
        Rs.{price}
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e)=>handleInputChange(e,dispatch)}
        />
      </div>



      <div className="filter-category">
        <h3><b>Genre</b></h3>
        <div>
        {genreData
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
                name="genre"
                value={curElem}
                className={curElem === genre? "active" : ""}
                onClick={(e)=>handleInputChange(e,dispatch)}>
                {truncateText(curElem,17)}
              </button>
            );
          })}
        {genreData.length>visibleLists && (
          <Button onClick={()=>{handleViewMoreClick(visibleLists, setvisibleLists)}}>View More +</Button>
        )
        } 
        {visibleLists > 4 && (
              <Button onClick={()=>{handleViewLessClick(visibleLists, setvisibleLists)}}>View Less -</Button>
            )}
        </div>
        {/* <div>
        <p>Selected Genres: {selectedLists.join(', ')}</p>
      </div> */}
      </div>

      <div className="filter-category">
        <h3><b>Authors</b></h3>
        <AuthorFilter authorData={authorData}/>
      </div>

      <div className="filter-company">
        <h3><b>Ratings</b></h3>

        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <select
            name="avg_rating"
            id="company"
            className="filter-company--select"
            onChange={(e)=>handleInputChange(e,dispatch)}>
            
            {
              (() => {
                const options = [];
                for (let index = 0; index < 10; index++) {
                  options.push(
                  <option key={index} value={index} name="avg_rating">
                    {`${index}+`}
                  </option>
                  );
                }
                return options;
              })()
            }
           
          </select>
        </form>
      </div>


    </div>
      
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .filters {
    

    @media only screen and (max-width: 768px) {
      /* Apply styles for tablet view */
      display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1.5fr);
    }

    @media only screen and (max-width: 480px) {
      /* Apply styles for mobile view */
      display: grid;
    grid-template-columns: repeat(2, 1fr);
    }
  }


  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      p, button{
        background-color: #f8f7f7
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }


  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;

  }
  @media only screen and (max-width: 900px) {
    .btn{
    font-size: 1.2rem;
    }
    .filter-clear{
      margin-top: 20px;
    }
  }
`;

export default FilterSection;