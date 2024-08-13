import React, { useState } from 'react';
import {
    PageContainer, // New outer container
    ChatContainer,
    ChatWindow,
    Message,
    InputContainer,
    TextInput,
    SendButton,
    BookCard,
    BookTitle,
    BookDescription,
    BookImage,
    LoadingSpinner,
    Title
} from './styles'; // Import the styles

import { getBookRecommendations } from '../../services/AIChatService'; // Import the new API service

const ChatComponent: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [aiResponse, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSend = async () => {
        const prompt = `Recommend me books similar to the book ${inputText}`;
        setLoading(true); // Show loading spinner
        try {
            const response = await getBookRecommendations(prompt);
            setResponse(response);
            setChatHistory([...chatHistory, `AI: ${response}`]);
        } catch (error) {
            console.error("Error generating AI response:", error);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    const parseAIResponse = (responseText: string) => {
        const bookPattern = /(\d+)\.\s*([^*]+)\s*\*\s*Description:\s*([^*]+)\s*\*\s*Image URL:\s*(https?:\/\/[^\s]+)/g;
        const books = [];
        let match;
        while ((match = bookPattern.exec(responseText)) !== null) {
            books.push({
                title: match[2].trim(),
                description: match[3].trim(),
                imageUrl: match[4].trim(),
            });
        }
        return books;
    };

    const books = parseAIResponse(aiResponse);

    return (
        <PageContainer>
            <ChatContainer>
                <Title>Chat with AI</Title>
                <ChatWindow>
                    {chatHistory.map((message, index) => (
                        <Message key={index}>
                            {message}
                        </Message>
                    ))}
                </ChatWindow>
                <InputContainer>
                    <TextInput 
                        type="text" 
                        value={inputText} 
                        onChange={handleInputChange} 
                        placeholder="Type your favorite Book Name to get recommendations..." 
                    />
                    <SendButton onClick={handleSend} disabled={!inputText.trim()}>
                        Send
                    </SendButton>
                </InputContainer>
                {loading && (
                    <LoadingSpinner>Loading...</LoadingSpinner>
                )}
                {aiResponse && (
                    <div>
                        <h2>AI Recommendations</h2>
                        <div>
                            {books.map((book, index) => (
                                <BookCard key={index}>
                                    <BookImage src={book.imageUrl} alt={book.title} />
                                    <BookTitle>{book.title}</BookTitle>
                                    <BookDescription>{book.description}</BookDescription>
                                </BookCard>
                            ))}
                        </div>
                    </div>
                )}
            </ChatContainer>
        </PageContainer>
    );
};

export default ChatComponent;
