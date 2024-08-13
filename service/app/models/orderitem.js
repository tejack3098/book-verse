import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    priceperunit: {
        type: Number,
        required: true
    }
});

export default orderItemSchema;
