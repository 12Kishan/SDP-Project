import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
});

export const Account = mongoose.models.Accounts || mongoose.model("Accounts", accountSchema);