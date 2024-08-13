// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping if the screen is too narrow */
  justify-content: center; /* Centers the buttons horizontally */
  padding: 10px;
`;

export const Button = styled.button`
  color: blue;
  margin: 5px;
  background-color: white;
  border: 2px solid blue;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: blue;
    color: white;
  }
`;
