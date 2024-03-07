import mongoose, { Schema } from "mongoose";

const QuizType = {
    MCQ: "mcq",
    Blanks: "blanks",
};

const QuizDifficulty = {
    Easy: "easy",
    Medium: "medium",
    Hard: "hard",
};

const quizSchema = new Schema({
    userId: { type: mongoose.ObjectId },
    shared: { type: Boolean, default: false },
    topic: { type: String, required: true },
    type: { type: String, enum: Object.values(QuizType), default: QuizType.MCQ },
    difficulty: {
        type: String,
        enum: Object.values(QuizDifficulty),
        default: QuizDifficulty.Easy,
    },
    questions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
});


const Quiz = mongoose.models.Quizzes || mongoose.model("Quizzes", quizSchema);

export { Quiz, QuizType, QuizDifficulty };

// const mongoose = require("mongoose");
// const { Question } = require("./question"); // Import the Question model

// const QuizType = {
//   MCQ: "mcq",
//   Blanks: "blanks",
// };
// const QuizDifficulty = {
//   Easy: "easy",
//   Medium: "medium",
//   Hard: "hard",
// };
// const quizSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//     default: () => mongoose.Types.ObjectId().toString(),
//   },
//   userId: { type: String, required: true },
//   timeStarted: { type: Date, required: true, default: Date.now },
//   timeEnded: { type: Date },
//   topic: { type: String, required: true },
//   type: { type: String, enum: Object.values(QuizType), default: QuizType.MCQ }, // Default to MCQ
//   difficulty: {
//     type: String,
//     enum: Object.values(QuizDifficulty),
//     default: QuizDifficulty.Easy,
//   }, // Default to Easy
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: Question }], // Array of question references
// });

// const Quiz = mongoose.models.Quizzes || mongoose.model("Quizzes", quizSchema);

// module.exports = { Quiz, QuizType, QuizDifficulty };