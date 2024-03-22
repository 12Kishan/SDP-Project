import mongoose from "mongoose";

const QuizType = {
    MCQ: "mcq",
    Blanks: "blanks",
};

const QuizDifficulty = {
    Easy: "easy",
    Medium: "medium",
    Hard: "hard",
};

const quizSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },
    questions: [{ type: mongoose.Types.ObjectId }],
    shared: { type: Boolean, default: false },
    topic: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(QuizType),
        default: QuizType.MCQ,
    },
    date: { type: Date, default: new Date() },
    description: { type: String, default: '' },
    difficulty: {
        type: String,
        enum: Object.values(QuizDifficulty),
        default: QuizDifficulty.Easy,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});


quizSchema.virtual('topicCount', {
    ref: 'Quizzes',
    localField: 'topic',
    foreignField: 'topic',
    count: true
});




const Quiz = mongoose.models.Quizzes || mongoose.model("Quizzes", quizSchema);

export { Quiz, QuizDifficulty, QuizType };