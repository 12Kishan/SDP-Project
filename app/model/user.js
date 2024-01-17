import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    emailVerified: Date,
    image: String,
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    password_reset: String,
    isAdmin: { type: Boolean, default: false }
});

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, "name required"]
//     },
//     email: {
//         type: String,
//         required: [true, "email required"],
//         unique: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: [false, "password required"]
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },
// });

export const User = mongoose.models.Users || mongoose.model("Users", userSchema);