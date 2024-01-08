const mongoose = require('mongoose');
const { Question } = require('./question'); // Import the Question model

const QuizType = {
    MCQ: 'mcq',
    Blanks: 'blanks',
}

const quizSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => mongoose.Types.ObjectId().toString() },
    userId: { type: String, required: true },
    timeStarted: { type: Date, required: true, default: Date.now },
    timeEnded: { type: Date },
    topic: { type: String, required: true },
    type: { type: String, enum: Object.values(QuizType), default: QuizType.MCQ }, // Default to MCQ
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: Question }], // Array of question references
});

const Quiz = mongoose.models.Quizzes || mongoose.model("Quizzes", quizSchema);

module.exports = { Quiz, QuizType };
