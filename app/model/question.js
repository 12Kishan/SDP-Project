import mongoose, { Schema } from "mongoose";

const QuizType = {
    MCQ: "mcq",
    Blanks: "blanks",
};

const questionSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    quizId: { type: mongoose.Types.ObjectId /*, required: true*/ },
    questionType: { type: String, enum: Object.values(QuizType) },
    options: { type: String, default: undefined },
});

const Question = mongoose.models.Questions || mongoose.model("Questions", questionSchema);

export { Question, QuizType };