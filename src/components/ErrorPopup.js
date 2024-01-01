import React from "react";
import styled from "styled-components";

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <Popup>
      <Content>
        {errorMessage.success && <SuccessMessage>{errorMessage.success}</SuccessMessage>}
        {errorMessage.frontend && <ErrorMessage>{errorMessage.frontend}</ErrorMessage>}
        {errorMessage.backend && <ErrorMessage>{errorMessage.backend}</ErrorMessage>}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Content>
    </Popup>
  );
};

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  text-align: center;
  font-size:15px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: red;
  }
`;

export default ErrorPopup;
