import User from '../models/user.js';
import bcrypt from 'bcryptjs';


export const getAllUsers = async(query) => {
    const { keyword } = query;

    let filter = {};

    if(keyword){
        filter.$or = [
            { firstName: new RegExp(keyword, 'i') },
            { lastName: new RegExp(keyword, 'i') }
        ];
    }

    return await User.find(filter).exec();
};

// Get User by ID
export const getUser = async(id) => {
    return await User.findById(id).exec();
};

// Add a new User
export const addUser = async(newUser) => {
    const user = new User(newUser);
    return await user.save();
};

// Update an existing User
export const updateUser = async(id, updatedUser) => {

    if (updatedUser.password) {
        // If password is being updated, hash it
        updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
    }

    return await User.findByIdAndUpdate(id, updatedUser, {new: true}).exec();
};

// Delete a user
export const deleteUser = async(id) => {
    return await User.findByIdAndDelete(id).exec();
}
