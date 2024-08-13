// src/components/BookCard.tsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { Book } from '../models/book';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './Translate/LanguageSelector';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t } = useTranslation('common');
  return (
  <Card sx={{ width: 300, height: 450, margin: 2, display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="140"
      image="https://via.placeholder.com/150"
      alt={book.title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="div">
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {book.description}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <strong>{t("app.author")}:</strong> {book.author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{t("app.pages")}:</strong> {book.numberOfPages}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{t("app.rating")}:</strong> {book.averageRating}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{t("app.pricing")}:</strong> {book.pricePerUnit}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" href={book.link}>
        {t("app.learn")}
      </Button>
    </CardActions>
    <div className="language-selector-container">
        <LanguageSelector />
      </div>
    </Card>
    

  );
};

export default BookCard;
