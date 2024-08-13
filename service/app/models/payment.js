import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
    {
        orderId: { type: String, required: true },
        customerId: { type: String, required: true },
        paymentAmount: { type: Number, required: true },
        
    }
);

const Payment = mongoose.model('Payment', paymentSchema); 

export default Payment;
