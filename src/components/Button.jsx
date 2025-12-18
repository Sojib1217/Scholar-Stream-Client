import React from 'react';

import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button>View Details</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    padding: 14px 34px;
    border-radius: 50px;
    cursor: pointer;
    border: 0;
    background-color: white;
    box-shadow: rgb(0 0 0 / 5%) 0 0 6px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 15px;
    transition: all 0.5s ease;
  }

  button:hover {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 5px 25px 0px;
  }

  button:active {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }`;

export default Button;
