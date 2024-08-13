import mongoose from "mongoose";
import orderItemSchema from "./orderitem.js";
import config from './schema-config.js'

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    tax: { type: Number, required: false },
    total: { type: Number, required: true },
    shipping: { type: Number },
    items: { type: [orderItemSchema], required: true },
    deliveryDate: { type: String }
}, config);

const Order = mongoose.model('Order', orderSchema);

export default Order;
