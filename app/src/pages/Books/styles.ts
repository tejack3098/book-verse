import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(90deg, #fff9c4, #fff176, #ffeb3b, #ffd700); /* Horizontal gradient yellow background */
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: #000;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* Wrap items to next line if not enough space */
    gap: 1.5rem; /* Space between cards */
    max-width: 1200px;
    width: 100%;
    margin-top: 2rem;
    justify-content: center;

    @media (max-width: 1200px) {
        max-width: 1000px;
    }

    @media (max-width: 992px) {
        max-width: 800px;
    }

    @media (max-width: 768px) {
        max-width: 600px;
    }

    @media (max-width: 576px) {
        max-width: 100%;
        flex-direction: column; /* Stack cards vertically on very small screens */
        align-items: center;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;

    button {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd; /* Light border for separation */
        border-radius: 4px; /* Rounded corners */
        background-color: #fff;
        color: #333;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background-color 0.3s ease, color 0.3s ease;

        &.active {
            background-color: #5280e2;
            color: #fff;
            border-color: #5280e2;
        }

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

export const SearchContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    background-color: #fff; /* White background for the search container */
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    padding: 0.5rem;
    
    .search-icon {
        margin-right: 0.75rem; /* Increased margin for better spacing */
        color: #333;
    }

    input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #ddd; /* Light border to match the search box */
        border-radius: 4px;
        background-color: #f9f9f9; /* Light grey background for the input box */
        color: #333; /* Dark font color for good contrast */
        font-size: 1rem;
        box-sizing: border-box;
        outline: none;

        &:focus {
            border-color: #5280e2; /* Blue border on focus for better visibility */
            background-color: #fff; /* White background on focus */
        }
    }
`;
