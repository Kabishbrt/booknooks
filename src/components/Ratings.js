import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  color: ${({ fillPercentage }) => {
    if (fillPercentage === 1) return "#ffc107"; // Fully filled star
    if (fillPercentage > 0) return `linear-gradient(90deg, #ffc107 ${fillPercentage * 100}%, #e0e0e0 ${fillPercentage * 100}%)`; // Partially filled star
    return "#e0e0e0"; // Empty star
  }};
  font-size: 5rem;
  margin-right: 2px;
`;

const RatingText = styled.span`
  font-size: 3rem;
  margin-left: 5px;
`;

const Rating = ({ value }) => {
    const renderStars = () => {
      const stars = [];
      const wholeStars = Math.floor(value);
      const fillPercentage = value - wholeStars;
  
      for (let i = 1; i <= 10; i++) {
        let starComponent;
  
        if (i <= wholeStars) {
          starComponent = <StarIcon key={i} fillPercentage={1}>&#9733;</StarIcon>; // Fully filled star
        } else if (i === wholeStars + 1 && fillPercentage > 0) {
          starComponent = <StarIcon key={i} fillPercentage={fillPercentage}>&#9733;</StarIcon>; // Partially filled star
        } else {
          starComponent = <StarIcon key={i} fillPercentage={0}>&#9733;</StarIcon>; // Empty star
        }
  
        stars.push(starComponent);
      }
  
      return stars;
    };
  
    return (
      <RatingContainer>
        {renderStars()}
        <RatingText>{value.toFixed(1)}/10</RatingText>
      </RatingContainer>
    );
  };
export default Rating;
