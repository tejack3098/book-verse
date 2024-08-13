import Order from '../models/order.js';

export const getAllOrders = async(query) => {
    const { startDate, endDate } = query;

    let filter = {};

    if (startDate && endDate) {
        filter.deliveryDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    return await Order.find(filter).exec();
};

// Get Order by ID
export const getOrder = async(id) => {
    return await Order.findById(id).exec();
};

// Add a new order
export const addOrder = async(newOrder) => {
    const order = new Order(newOrder);
    return await order.save();
};

// Update an existing Order
export const updateOrder = async(id, updatedOrder) => {
    return await Order.findByIdAndUpdate(id, updatedOrder, {new: true}).exec();
};

// Delete a order
export const deleteOrder= async(id) => {
    return await Order.findByIdAndDelete(id).exec();
}

// Get orders by userId
export const getOrdersByUserId = async(userId) => {
    return await Order.find({ userId }).exec();
};
