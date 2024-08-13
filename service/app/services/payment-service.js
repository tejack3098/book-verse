import Payment from '../models/payment.js';

// Create payment Intent
export const initiatePayment = async(newPayment) => {
    const payment = new Payment(newPayment);
    return await payment.save();
};
