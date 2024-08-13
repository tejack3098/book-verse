import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ButtonContainer, Container, TextContainer } from "./styles";
import { addToCart } from "../../store/cartSlice"; // Adjust the path as needed
import { useTranslation } from "react-i18next"; 
import { FaShareAlt } from "react-icons/fa"; // Import share icon

interface IProps {
  info: {
    id: string;
    author: string;
    country: string;
    imageLink: string;
    link:string;
    title: string;
    year: number;
    price: number;
    book_id: number;
    detailsButton?: boolean;
  };
}

export const Card = ({ info }: IProps) => {
  const { t } = useTranslation();
  const {
    id,
    author,
    country,
    imageLink,
    link,
    title,
    year,
    price,
    book_id
  } = info;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cartItem = {
      id,
      author,
      country,
      year,
      imageLink,
      title,
      price, 
    };
    
    dispatch(addToCart(cartItem));
    alert(`${title} has been added to your cart!`);

  };

  const handleShare = async () => {
    const link2 = `http://localhost:3002/books/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this book: ${title} by ${author}`,
          url: link2,
        });
        console.log('Book shared successfully');
      } catch (error) {
        console.error('Error sharing book:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Container>
      <h2>{title}</h2>
      <img
        src={imageLink}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = "/path/to/placeholder-image.png"; // Adjust placeholder image path
        }}
      />
      <TextContainer>
        <p>
          <span>{t("app.author")}: </span>
          {author}
        </p>
        <p>
          <span>{t("app.pricing")}: </span>
          {price}
        </p>
      </TextContainer>

      <ButtonContainer>
        <button onClick={handleAddToCart}>{t("app.add")}</button>
        <Link to={`/books/${id}`}>{t("app.details")}</Link>
        <button onClick={handleShare}>
          <FaShareAlt /> {t("app.share")}
        </button>
      </ButtonContainer>
    </Container>
  );
};