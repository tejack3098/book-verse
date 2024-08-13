import mongoose from "mongoose";

const publisherSchema = mongoose.Schema({
    publisherId: { type: String, required: true },
    name: { type: String, required: true },
    street: {type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String }
}) 

const Publisher = mongoose.model('Publisher', publisherSchema);

export default Publisher;