import React, { useState, useEffect } from 'react';

const OrdersBookInfo = ({ productId, authToken }) => {
  console.log("Bookid:", productId);
  const [book, setBook] = useState(null);
  

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/id/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const bookData = await response.json();
        setBook(bookData.book);
        console.log("Book Data", bookData); // Use bookData instead of book
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
  
    fetchBook();
  }, [productId, authToken]);

  return (
    <div>
      {book ? (
        <>
          <img
            src={book.ImageURLM}  
            alt={book.BookTitle}
            style={{ maxWidth: '50px', maxHeight: '50px' }}
            />
            <p>{book.BookTitle}</p>
        </>
        
      ) : (
        "Book not available"
      )}
    </div>
    
  );
};

export default OrdersBookInfo;
