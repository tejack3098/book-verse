import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/books'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 600, p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Order Confirmed!
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for your purchase. Your order has been placed successfully and is being processed.
            </Typography>
            <Typography variant="body1" paragraph>
              You will receive an email confirmation with the details of your order shortly.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBackToHome}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
