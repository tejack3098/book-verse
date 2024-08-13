import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const StyledForm = styled.form`
  border-radius: 0.5rem;
  text-align: center;
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  gap: 1.5rem;
`;

export const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: #333;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: #5280e2;
      outline: none;
      box-shadow: 0 0 0 2px rgba(82, 128, 226, 0.2);
    }
  }
`;

export const SubmitButton = styled.input`
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  background-color: #5280e2;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #416bb3;
  }
`;
