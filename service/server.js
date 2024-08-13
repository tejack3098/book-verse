import express from 'express';
import dotenv from 'dotenv';
import initApp from './app/app.js';
import stripePackage from 'stripe';
import nodemailer from 'nodemailer';
//import {OrderConfirmation} from '/app/src/pages/OrderConfirmation';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3002; // Fallback to 4242 if PORT is not defined

// Initialize the application with middlewares and routes
initApp(app);

// Stripe setup
const stripe = stripePackage('sk_test_51OHL2gLKcdm260BZplzIs4Fi5eSWxi9JNsqGoh71TgbSjvgcCwHaWDeGFG0ztaM7w9cR89Kpm4jqEd72WDHJqtW200twsY0tHE');
app.use(express.json()); // To parse JSON bodies

const YOUR_DOMAIN = 'http://localhost:3002';

// Create a test account and transporter for Ethereal
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return process.exit(1);
  }

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  app.post('/create-checkout-session', async (req, res) => {
    const { items, email } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/order-confirmation`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ id: session.id });
  });

  app.get('/checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (session.payment_status === 'paid') {
      const mailOptions = {
        from: 'no-reply@example.com',
        to: session.customer_email,
        subject: 'Payment Successful',
        text: 'Thank you for your purchase!',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error); // Enhanced error logging
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Preview URL for Ethereal
        res.send('Payment status checked and email sent');
      });
    } else {
      res.send('Payment status checked');
    }
  });

  // Start the server and listen on the specified port
  app.listen(port, () => console.log(`Server running on port ${port}`));
});