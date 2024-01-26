import { OpenAI } from 'openai';
import { resolve } from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// const strict_input = ' input topic strictly should not from politics/political leaders, any brands/companies , religious, terrorism, games, and any sensitive domain. if topic from that domain strictly return only null JSON object.';


async function generatePrompt(systemPrompt: string, outputFormatPrompt: string, userContent: string) {
    const response = await openai.chat.completions.create({
        temperature: 1,
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemPrompt + /*strict_input +*/ outputFormatPrompt,
            },
            { role: "user", content: userContent.toString() },
        ],
    });
    if (response.choices && response.choices.length > 0) {
        const res = response.choices[0].message.content;
        return res;
    }
}
async function generate_blanks(str: string) {
    const systemPrompt = "You are openhanded question and answer provider teacher based on provided difficulty level and given amount of questions for students. stric output: if you think topic is not appropriate for teacher position to ask, then strict return null Json object";
    const outputFormatPrompt = " otherwise give strict output in valid json string: {question: question, answer: correct answer}, strict note max length of answer and question must less than 15 words, strictly return only one valid json string having array of question json string eg: \"{questions:[{Q1,A1}, {Q2,A2}]}}\". follow strict output form in valid json string only that can be parse into json object. Make sure question and answer should be correct.";

    return generatePrompt(systemPrompt, outputFormatPrompt, str);
}

async function generate_mcq(str: string) {
    const systemPrompt = "You are mcq question provider teacher based on provided difficulty level and given amount of questions for students. stric output: if you think topic is not appropriate for teacher position to ask, then strict return null Json object";
    const outputFormatPrompt = " otherwise give strict output in valid json string: {question: question, answer: answer, option1: option1, option2: option2, option3: option3}, strict note options should be different than correct answer, only one answer should be correct and all three options should be incorrect, max length of answer, and options strictly less than 15 words, strictly return only one valid json string having array of question json string eg: \"{questions:[{Q1}, {Q2}]}}\". make sure options, answer, and question should not be null. follow strict output form in valid json string only that can be parse into json object. Make sure question and only one answer should be correct.";

    return generatePrompt(systemPrompt, outputFormatPrompt, str);
}

export { generate_mcq, generate_blanks };
