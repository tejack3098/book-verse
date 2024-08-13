import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        userID: { type: String, required: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: 'customer' },
        address: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);  

export default User;