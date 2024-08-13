// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import BookCard from '../components/BookCard';
import { Book } from '../models/book';
import booksData from '../books.json';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setBooks(booksData as Book[]);
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {books.map((book) => (
          <Grid item key={book.isbn}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
