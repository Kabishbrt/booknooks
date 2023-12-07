import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import styled from "styled-components";
import GridView from "./GridView";

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

      const handleViewMore = () => {
        setState((prevState) => ({
          ...prevState,
          visibleLists: prevState.visibleLists + 4, // Increase by 4 or your desired value
        }));
      };
    
      const handleViewLess = () => {
        setState((prevState) => ({
          ...prevState,
          visibleLists: prevState.visibleLists - 4, // Decrease by 4 or your desired value
        }));
      };

      if(State.isLoading===true){
          return(
              <h1>Loading</h1>
          )
      }
    if(State.status===200){


        if(State.books){
            console.log(State.books)

        
                return(
            //html section for featured books

                <Wrapper>
                    <h2>FeaturedBooks</h2>
                    <GridView books={State.books} />
                    visibleLists={State.visibleLists}
                    handleViewMore={handleViewMore}
                    handleViewLess={handleViewLess}
                </Wrapper>


                );

        }

        else{
            return(
                <h1>No Books Found</h1>
            )
        }
    }
}

const Wrapper = styled.div`
  /* Add any additional styling for the wrapper if needed */
`;