import React, { useEffect, useState } from "react";
import axios from "axios";

export const Book =()=>{
    const [State, setState] = useState({isLoading: true,book: [],status:0})
   
    useEffect(() => {
        axios.get("http://localhost:5000/books/single/1984")
          .then((res) => {
            setState({ isLoading: false, book: res.data.book, status: res.status });
          })
          .catch((err) => {
            console.error(err); // Log the error if needed
            setState({ isLoading: false, book: null, status: 0 });
          });
      }, []);

      if(State.isLoading===true){
          return(
              <h1>Loading</h1>
          )
      }
    if(State.status===200){


        if(State.book){
            const {_id,ISBN,BookTitle,BookAuthor,YearOfPublication,Publisher,ImageURLS,ImageURLM,ImageURLL,Price,Stock,ratings} = State.book;
        return(

            <img src={ImageURLL} />
        );
        }

        else{
            return(
                <h1>No Books Found</h1>
            )
        }
    }
}