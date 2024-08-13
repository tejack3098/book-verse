import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 100vw;
  max-height: 100vw;
  padding: 40px;
  margin: 0 auto;
   background: linear-gradient(90deg, #fff9c4, #fff176, #ffeb3b, #ffd700); /* Horizontal gradient yellow background 
  font-family: 'Roboto', sans-serif;
  color: #000;
`;

export const CartSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #4a4a4a; // Ensure the title uses the dark grey color
  margin-bottom: 30px;
`;


export const CartItemsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
 
`;

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  ;
`;

export const CartItemDetails = styled.div`
  margin-left: 20px;
  flex: 1;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    font-family: 'Roboto', sans-serif;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
  h2{
    font-size: 20px;
    font-weight: 600;
    color: #000;
    font-family: 'Roboto', sans-serif;
  }
   
`;

export const CartItemActions = styled.div`
  margin-left: auto;

  button {
    background-color: #007bff; /* Blue color */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Darker blue color on hover */
    }
  }
`;

export const EmptyCartMessage = styled.p`
  font-size: 20px;
  text-align: center;
  color: #777;
`;

export const SummaryContainer = styled.div`
  flex: 1;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const TotalPriceContainer = styled.div`
  text-align: right;
  margin: 10px;

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    font-family: 'Roboto', sans-serif;
  }
`;

export const ClearCartButton = styled.button`
  background-color: #007bff; /* Blue color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-right: 10px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue color on hover */
  }
`;

export const CheckoutButton = styled.button`
  background-color: #28a745; /* Green color for checkout */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838; /* Darker green color on hover */
  }
`;
