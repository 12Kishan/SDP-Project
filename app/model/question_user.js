import mongoose, { Schema } from "mongoose";

const questionUserSchema = new Schema({
  questionId: { type: mongoose.ObjectId },
  userId: { type: mongoose.ObjectId },
  userAnswer: { type: String },
  isCorrect: { type: Boolean },
});

export const User =
  mongoose.models.QuestionUser ||
  mongoose.model("QuestionUser", questionUserSchema);
