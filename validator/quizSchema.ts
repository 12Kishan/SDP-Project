import { z } from 'zod'

export const quizSchema = z.object({
    topic: z.string().min(3, { message: 'topic must be atleast 3 characters long' }).max(25),
    type: z.enum(['mcq', 'blanks']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    amount: z.number().min(1).max(10)
})