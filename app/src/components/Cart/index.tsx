import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { removeFromCart, clearCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import OrderConfirmation from '../../pages/OrderConfirmation';
import {
  Title,
  Container,
  CartSection,
  CartItemsContainer,
  CartItemContainer,
  CartItemDetails,
  CartItemActions,
  EmptyCartMessage,
  SummaryContainer,
  TotalPriceContainer,
  ClearCartButton,
  CheckoutButton,
} from './styles';

import { placeOrder } from '../../services/OrderService';
import { IOrder } from '../../models/IOrder';
import { IOrderItem } from '../../models/IOrderItem';
import { format, addDays } from 'date-fns';
import { generateOrderId } from '../../utils/generateOrderId';
import { useTranslation } from "react-i18next";
import LanguageSelector from '../Translate/LanguageSelector';

const stripePromise = loadStripe('pk_test_51OHL2gLKcdm260BZRHavSLRFBz3KoA1zu2HntCNHnFMxnpsT4D0kLoo7j1nKdwafQOe4T003cgPbzXbrPN5tmwF900nhI3eoUp');

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: AppState) => state.cart.items);

  useEffect(() => {
    console.log('Cart component rendered');
  }, []);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateShipping = () => {
    // Implement shipping cost calculation if applicable
    return 0;
  };

  const calculateTax = () => {
    // Implement tax calculation if applicable
    return 0;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User is not logged in.');
      setLoading(false);
      return;
    }

    const orderItems: IOrderItem[] = cartItems.map(item => ({
      bookId: item.id,
      title: item.title,
      quantity: item.quantity,
      priceperunit: item.price,
    }));

    const orderData: IOrder = {
      id: "",
      orderId: generateOrderId(), // Implement this function to generate a unique order ID
      userId: userId,
      tax: calculateTax(),
      total: calculateTotalPrice(),
      shipping: calculateShipping(),
      items: orderItems,
      deliveryDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
    };

    try {
      await placeOrder(orderData);
     // navigate('/order-confirmation');
    } catch (error) {
      setError('Failed to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleCheckout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    handlePlaceOrder();
    event.preventDefault(); // Prevent default form submission
    console.log('Checkout button clicked'); // Debugging statement
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      console.error('Failed to create checkout session');
      return;
    }

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>;
  }

  return (
    <Container>
      <Title>Your Cart</Title>
      <CartSection>
        <CartItemsContainer>
          {cartItems.map((item) => (
            <CartItemContainer key={item.id}>
              <img src={item.imageLink} alt={item.title} />
              <CartItemDetails>
                <h3>{item.title}</h3>
                <p>{t("app.author")}: {item.author}</p>
                <p>{t("app.pricing")}: ${item.price}</p>
                <p>{t("app.quantity")}: {item.quantity}</p>
              </CartItemDetails>
              <CartItemActions>
                <button onClick={() => handleRemoveFromCart(item.id)}>{t("app.remove")}</button>
              </CartItemActions>
            </CartItemContainer>
          ))}
        </CartItemsContainer>
        <SummaryContainer>
          <TotalPriceContainer>
            <h3>{t("app.total")}: ${calculateTotalPrice().toFixed(2)}</h3>
            <ClearCartButton onClick={handleClearCart}>{t("app.clear")}</ClearCartButton>
            <CheckoutButton type="button" onClick={handleCheckout}>{t("app.checkout")}</CheckoutButton> {/* Ensure type is button */}
          </TotalPriceContainer>
        </SummaryContainer>
      </CartSection>
      <div className="language-selector-container" style={{ marginTop: '400px',marginRight: '100px' , marginLeft: '100px' }}>
        <LanguageSelector />
      </div>
    </Container>
  );
};