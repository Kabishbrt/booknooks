import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from './components/Slider';

export const Home = ({}) => {
  const {staus,isLoading, totalcount, books, error } = useSelector((state) => state.books);

  return (
    <>
      <Slider />

    </>
  );
};

