import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {IBookInfo} from "../../../models/IBookInfo";
import { getBookById } from "../../../services/BooksAPI";
import { Card } from "../../../components/Card";
import { Container } from "./styles";
import { CardContainer } from "../styles";
import { Title } from "../../../components/Title";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../../../components/Translate/LanguageSelector";
import { getRecommendationsByBook } from "../../../services/recommendation-service";

export const Details = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();

  const [bookInfo, setBookInfo] = useState<IBookInfo>({} as IBookInfo);

  useEffect(() => {
    getBookById(id as string).then((response: IBookInfo) =>
      setBookInfo(response)
    );
  }, [id]);

  useEffect(() => {
    if (bookInfo && bookInfo.book_id) {
      fetchSimilarBooks(bookInfo.book_id);
    }
  }, [bookInfo]);

  const fetchSimilarBooks = useCallback((bookId: number) => {
    console.log("Fetching similar books for book_id:", bookId);
    getRecommendationsByBook(bookId).then((response: []) => {
      const formattedBooks = response.map(item => item[0] || item);
      console.log(formattedBooks);
      setSimilarBooks(formattedBooks);
    });
  }, []);

  const [similarBooks, setSimilarBooks] = useState<IBookInfo[]>([]);



  // console.log("Returning BOOK INFO");
  // console.log(bookInfo);

  // const [similarBooks, setSimilarBooks] = useState<IBookInfo[]>([]);
  // const fetchSimilarBooks = useCallback(() => {
  //   console.log("BEFORE CALLING ");
  //   console.log(bookInfo.book_id);
  //   getRecommendationsByBook(bookInfo.book_id as number).then((response: IBookInfo[]) => setSimilarBooks(response));
  // }, []);

  // useEffect(() => {
  //   fetchSimilarBooks()
  // }, [fetchSimilarBooks]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bookInfo.title,
          text: `Check out this book: ${bookInfo.title} by ${bookInfo.authors}`,
          url: window.location.href,
        });
        console.log('Share successful');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Container>
      
      <Title text={t("app.details")} />
      {/* <button onClick={handleShare} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/images/share.png" alt="Share" />
      </button> */}
      <Card
        info={{
          id: bookInfo.id,
          author: bookInfo.authors,
          country: bookInfo.country,
          imageLink: bookInfo.image_url,
          link: bookInfo.link,
          title: bookInfo.title,
          year: bookInfo.year,
          price: bookInfo.price,
          book_id: bookInfo.book_id
        }}
      />

      <Title text={t("app.recommendations")}></Title>
      <CardContainer>
                {similarBooks.map((book, index) => (
                    <Card
                        info={{
                            id: book.id,
                            author: book.authors,
                            country: book.country,
                            imageLink: book.image_url,
                            link: book.link,
                            title: book.title,
                            year: book.year,
                            price: book.price,
                            book_id: book.book_id,
                            detailsButton: true,
                        }}
                        key={index}
                    />
                ))}
            </CardContainer>

      <div className="language-selector-container" style={{ marginTop: '250px' }}>
        <LanguageSelector />
      </div>
    </Container>
  );
};