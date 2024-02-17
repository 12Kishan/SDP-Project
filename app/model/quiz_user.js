import mongoose, { Schema } from "mongoose";

const quizUserSchema = new Schema({
  quizId: { type: mongoose.ObjectId },
  userId: { type: mongoose.ObjectId },
  timeStarted: { type: Date, required: true },
  timeTaken: { type: String },
});

export const User =
  mongoose.models.QuizUser || mongoose.model("QuizUser", quizUserSchema);
