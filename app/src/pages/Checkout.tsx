import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Info from './Info';
import { placeOrder } from '../services/OrderService';
import { IOrder } from '../models/IOrder';
import { IOrderItem } from '../models/IOrderItem';
import { format, addDays } from 'date-fns';
import { generateOrderId } from '../utils/generateOrderId';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const cartItems = useSelector((state: AppState) => state.cart.items);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    // Implement shipping cost calculation if applicable
    return 0;
  };

  const calculateTax = () => {
    // Implement tax calculation if applicable
    return 0;
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    const orderItems: IOrderItem[] = cartItems.map(item => ({
      bookId: item.id,
      title: item.title,
      quantity: item.quantity,
      priceperunit: item.price,
    }));

    const orderData: IOrder = {
      id: "",
      orderId: generateOrderId(), // Implement this function to generate a unique order ID
      userId: localStorage.getItem('userId') || '',
      tax: calculateTax(),
      total: calculateTotalPrice(),
      shipping: calculateShipping(),
      items: orderItems,
      deliveryDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),

    };

    try {
      await placeOrder(orderData);
      navigate('/order-confirmation');
    } catch (error) {
      setError('Failed to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={3} sx={{ height: '100vh', px: 3, py: 2 }}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ display: { xs: 'none', sm: 'block' }, pr: 2 }}>
          <Card>
            <CardContent>
              <Info cartItems={cartItems} totalPrice={calculateTotalPrice().toFixed(2)} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeStep === 0 && <AddressForm />}
                {activeStep === 1 && <PaymentForm />}
                {activeStep === 2 && <Review />}
                <Stack direction="row" spacing={2} sx={{ pt: 3, justifyContent: 'space-between' }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                    >
                      {loading ? 'Placing order...' : 'Place order'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </Stack>
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
