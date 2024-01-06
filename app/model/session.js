import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    sessionToken: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    expires: Date,
});

export const Session = mongoose.models.Sessions || mongoose.model("Sessions", sessionSchema);