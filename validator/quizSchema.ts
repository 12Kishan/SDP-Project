import { z } from 'zod'

export const quizSchema = z.object({
    topic: z.string().min(3, { message: 'topic must be atleast 3 characters long' }).max(25),
    type: z.enum(['mcq', 'blanks']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    amount: z.number().min(1).max(10)
})

export const answerSchema = z.object({
    questionId: z.string(),
    quizId: z.string(),
    userId: z.string(),
    shared: z.boolean(),
    userAnswer: z.string(),
    index: z.number(),
    len: z.number(),
    timeTaken: z.string()
})