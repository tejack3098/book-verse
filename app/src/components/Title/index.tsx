import React from 'react';
import styled from 'styled-components';

interface TitleProps {
    text: string;
    color?: string; // Add color prop
}

const StyledTitle = styled.h1<{ color?: string }>`
    color: ${({ color }) => color || 'inherit'}; // Use color prop or default to inherit
`;

export const Title: React.FC<TitleProps> = ({ text, color }) => {
    return <StyledTitle color={color}>{text}</StyledTitle>;
};