import mongoose from 'mongoose';
import User from './user.js'; 

const adminSchema = new mongoose.Schema(
    {
        adminLevel: { type: Number, required: true }
    }
);

const Admin = User.discriminator('Admin', adminSchema);

export default Admin;
