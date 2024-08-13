import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
  width: 80%;

  label {
    font-size: 1.1rem;
    font-weight: 500;
    color: #c4c4c4;
  }

  input {
    margin: 1rem 0 2rem;
    padding: 0.5rem 1rem;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 0.5rem;
    color: #3a506b;
    font-size: 0.9rem;
    outline: none;
    background-color: #ffffff;
    font-family: inherit;
  }
`;