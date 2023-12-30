import mongoose, { Schema } from "mongoose";

// const modelName = "User";

// // Check if the model already exists
// const existingModel = mongoose.modelNames().includes(modelName);

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [false, "password required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

// export const User = existingModel ? mongoose.model(modelName) : mongoose.model(modelName, userSchema);
export const User = mongoose.models.Users || mongoose.model("Users", userSchema);