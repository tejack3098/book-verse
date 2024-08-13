import mongoose from "mongoose";
import config from "./schema-config.js";

const authorSchema = mongoose.Schema(
    {
    author_id: { type: Number, required: true },
    name: { type: String, required: true },
    average_rating: {type: Number, required: true}
    },
    config
);

const Author = mongoose.model('Author', authorSchema);

export default Author;