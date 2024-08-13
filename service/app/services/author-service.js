import Author from "../models/author.js";

// service to get all authors
export const getAllAuthors = async(query = {}) => {
    // console.log(query);
    return await Author.find(query).exec();
}

// service to get an author by id
export const getAuthor = async (id) => {
    return await Author.findById(id).exec();
};