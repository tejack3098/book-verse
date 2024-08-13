import styled from 'styled-components';

// Define a dark grey color
const darkGrey = '#4a4a4a';  // Adjust this shade if needed

// Container and other basic styles
export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to right, #fff9e6, #f9f2ec);
  border-radius: 8px;
  background: linear-gradient(90deg, #fff9c4, #fff176, #ffeb3b, #ffd700); /* Horizontal gradient yellow background 
  font-family: 'Roboto', sans-serif;
  color: #000;

`;

export const Title = styled.h1`
  text-align: center;
  color: ${darkGrey}; // Ensure the title uses the dark grey color
  margin-bottom: 30px;
`;

export const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
   background: linear-gradient(90deg, #fff9c4, #fff176, #ffeb3b, #ffd700); /* Horizontal gradient yellow background 
  font-family: 'Roboto', sans-serif;
  color: #000;
`;

export const OrderItem = styled.li`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(to right, #ffffff, #f5f5f5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  color: ${darkGrey};  // Set the text color for order items

  // Overlay styles
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    z-index: 0;  // Make sure the overlay is behind the content
  }

  // Ensure content is above the overlay
  * {
    position: relative;
    z-index: 1;
  }
`;

export const OrderDetails = styled.div`
  margin-bottom: 15px;
  color: ${darkGrey};  // Ensure the text color is consistent
`;

export const OrderDate = styled.p`
  font-style: italic;
  padding: 5px;
  color: #6c757d;  // Keeping the color as it is for date, but adjust if needed
`;

export const OrderItemContainer = styled.div`
  margin-top: 10px;
  padding-left: 20px;
  border-left: 2px solid #007bff;
  color: ${darkGrey};  // Set the text color for the item container
`;

export const NoOrdersMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: ${darkGrey};  // Adjust color for the no orders message
`;

// Review Button
export const ReviewButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #218838;
  }
`;

// Modal styles
export const ReviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: linear-gradient(to right, #ffffff, #f9f9f9);
  padding: 30px;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: ${darkGrey};  // Ensure modal text is in dark grey color
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  font-size: 24px;
  color: #dc3545;
  cursor: pointer;
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  color: ${darkGrey};  // Ensure the select text color is consistent
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 15px;
  background: #ffffff; // Ensure the background is white
  color: ${darkGrey}; // Set text color to dark grey
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StarRating = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  max-width: 200px;

  input[type="radio"] {
    display: none;
  }

  label {
    color: #ffd700;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  label:hover,
  label:hover ~ label {
    color: #ffc107;
  }

  input[type="radio"]:checked ~ label {
    color: #ffc107;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

export const LoadingMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
`;

// Add this to your styled-components
export const SuccessAlert = styled.div`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  text-align: center;
`;

export const h3 = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
   background: linear-gradient(90deg, #fff9c4, #fff176, #ffeb3b, #ffd700); /* Horizontal gradient yellow background 
  font-family: 'Roboto', sans-serif;
  color: #000;
`;

