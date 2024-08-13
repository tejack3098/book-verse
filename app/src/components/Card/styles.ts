import styled from "styled-components";

interface IProps {
  detailsButton?: boolean;
}

export const Container = styled.div<IProps>`
  border-radius: 8px;
  text-align: center;
  width: 300px; /* Adjust size as needed */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    object-fit: cover;
    margin-bottom: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  a, button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #5280e2;
    color: #fff;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #4165d2;
    }

    button {
      background-color: transparent;
      border: 2px solid #f53649;
      color: #f53649;

      &:hover {
        background-color: #f53649;
        color: #fff;
      }
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  span {
    font-weight: bold;
  }
`;
