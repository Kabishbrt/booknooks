import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from './components/Slider';
import { FeaturedBooks } from './components/FeaturedBooks';

export const Home = ({}) => {
  const {status,isLoading, totalcount, books, error } = useSelector((state) => state.books);

  
  
  return (
    <>
      <Slider />
      <FeaturedBooks/>

    </>
  );
};

