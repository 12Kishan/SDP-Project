import mongoose, { Schema } from "mongoose";

const QuizType = {
  MCQ: "mcq",
  Blanks: "blanks",
};

const questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  quizId: { type: mongoose.Types.ObjectId, ref: "Quiz", required: true },
  options: { type: String , default: undefined }, // For MCQ
  percentageCorrect: { type: Number }, // For blanks
  questionType: { type: String, enum: Object.values(QuizType) },
  userAnswer: { type: String },
  isCorrect: { type: Boolean },
});

const Question = mongoose.models.Questions || mongoose.model("Questions", questionSchema);

export { Question, QuizType };
