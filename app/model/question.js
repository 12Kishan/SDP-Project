const mongoose = require('mongoose');

const QuizType = {
    MCQ: 'mcq',
    Blanks: 'blanks',
}

const questionSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => mongoose.Types.ObjectId().toString() },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    quizId: { type: String, required: true },
    options: { type: mongoose.Schema.Types.Mixed }, // For MCQ
    percentageCorrect: { type: Number }, // For blanks
    questionType: { type: String, enum: Object.values(QuizType) },
    userAnswer: { type: String },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
});

const Question = mongoose.models.Questions || mongoose.model("Questions", questionSchema);

module.exports = { Question, QuizType };
