import mongoose, { Schema } from "mongoose";

const quizUserSchema = new Schema({
  quizId: { type: mongoose.ObjectId },
  userId: { type: mongoose.ObjectId },
  shared: { type: Boolean, default: false },
  timeStarted: { type: Date, required: true },
  timeTaken: { type: String },
});

export const QuizUsers = mongoose.models.QuizUser || mongoose.model("QuizUser", quizUserSchema);
