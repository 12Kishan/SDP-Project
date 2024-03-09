import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    emailVerified: Date,
    image: String,
    password_reset: String,
    isAdmin: { type: Boolean, default: false },
    date: { type: Date, default: new Date() }
});

export const User = mongoose.models.Users || mongoose.model("Users", userSchema);