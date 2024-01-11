import { OpenAI } from 'openai'

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const system_prompt = "You are mcq question provider based on different difficulty"
const output_format_prompt = "strict output in json array, format: {question: question, answer: answer, option1: option1, option2: option2, option3: option3}, if more than one questions return only one json object having multiple question json object. follow strict output form in json object only"

export default async function generate(str:string) {
    const response = await openai.chat.completions.create({
        temperature: 1,
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: system_prompt + output_format_prompt,
            },
            { role: "user", content: str.toString() },
        ],
    });
    return response
}
