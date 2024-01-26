import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  emailVerified: Date,
  image: String,
  isAdmin: { type: Boolean, default: false }
});

export const User = mongoose.models.Users || mongoose.model("Users", userSchema);