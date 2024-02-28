import React, { useState, useEffect } from 'react';

const OrdersBookInfo = ({ productId, authToken }) => {
  const [book, setBook] = useState(null);
  

  useEffect(() => {
    const fetchBook = async () => {
      const baseurl = process.env.REACT_APP_API_URL
      try {
        const response = await fetch(`${baseurl}/books/id/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const bookData = await response.json();
        setBook(bookData.book);
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
            <p style={{fontSize: '12px'}}>{book.BookTitle}</p>
            <p style={{fontSize: '12px'}}>Rs.{book.Price}</p>
        </>
        
      ) : (
        "..."
      )}
    </div>
    
  );
};

export default OrdersBookInfo;
