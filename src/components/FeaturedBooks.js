import React, { useEffect, useState } from "react";
import axios from "axios";
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

        
                return(
            //html section for featured books

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


                );

        }

        else{
            return(
                <h1>No Books Found</h1>
            )
        }
    }
}
