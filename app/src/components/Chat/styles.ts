import styled from 'styled-components';

// Define your color variables for easy maintenance
const primaryColor = '#333'; 
const titleColor = '#252230'; 
const chatWindowBackground = '#f9f9f9'; 
const messageBackground = '#e9ecef'; 

// Outer container with full viewport height and gradient background
export const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #fff9e6, #fff4d9);
    padding: 20px;
    box-sizing: border-box;
`;

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 900px;
    width: 100%; 
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
`;

export const ChatWindow = styled.div`
    background-color: ${chatWindowBackground};
    color: ${primaryColor};
    padding: 20px;
    border-radius: 10px;
    height: 500px; 
    overflow-y: auto;
`;

export const Message = styled.div`
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    background-color: ${messageBackground};
    color: ${primaryColor}; 
    overflow-wrap: break-word;
    white-space: pre-wrap;
`;

export const AIResponseContainer = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 20px;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`;

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
`;

export const TextInput = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    background-color: #ffffff; /* White background */
    color: #333333; /* Dark font color */
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow inside */
    
    &::placeholder {
        color: #666666; /* Darker placeholder color for better readability */
    }
`;


export const SendButton = styled.button`
    padding: 12px 25px;
    margin-left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #c6c6c6;
        cursor: not-allowed;
    }
`;

export const AIResponseText = styled.p`
    font-size: 18px;
    color: #333;
    margin-top: 10px;
    text-align: center;
    line-height: 1.6;
`;

export const BookCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 350px;
    text-align: center;
`;

export const BookTitle = styled.h3`
    font-size: 20px;
    color: #343a40;
    margin: 10px 0;
`;

export const BookDescription = styled.p`
    font-size: 16px;
    color: #6c757d;
    margin: 10px 0;
`;

export const BookImage = styled.img`
    max-width: 250px;
    height: auto;
    border-radius: 6px;
    margin-bottom: 10px;
`;

export const LoadingSpinner = styled.div`
    width: 100%;
    text-align: center;
    margin: 20px 0;
    font-size: 18px;
    color: #007bff;
    position: relative;
    &::before {
        content: '...';
        display: inline-block;
        margin-left: 10px;
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        0% { opacity: 0.1; }
        50% { opacity: 1; }
        100% { opacity: 0.1; }
    }
`;

// Title style for the ChatComponent
export const Title = styled.h1`
    color: ${titleColor};
    font-size: 24px; /* Adjust as needed */
    text-align: center; /* Center the title */
    margin-bottom: 20px;
`;
