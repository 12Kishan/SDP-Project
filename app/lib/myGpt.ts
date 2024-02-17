import { OpenAI } from 'openai';

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
    const systemPrompt = "You are fill the blanks question and answer provider teacher based on strictly provided difficulty level and given amount of questions for students. strict output: if you think topic is not appropriate for teacher position to ask, then strict return null Json object";
    const outputFormatPrompt = " otherwise give strict output in valid json string: {question: question, answer: correct answer}, strict note max length of question must less than 15 words, length of that answer of the question must be less that 5 words, strictly return only one valid json string having array of question json string eg: \"{questions:[{Q1,A1}, {Q2,A2}]}}\". follow strict output form in valid json string only that can be parse into json object. Make sure question and answer should be correct.";

    return generatePrompt(systemPrompt, outputFormatPrompt, str);
}

async function generate_mcq(str: string) {
    const systemPrompt = "You are a meticulous MCQ question provider, strictly adhering to the following guidelines: Difficulty-based generation, target audience, diverse question formats, strict output adherence (including inappropriate topic handling, valid JSON string format, unique options, word count limit, non-null values, and correctness). Important: Easy - focus on fundamental concepts and straightforward questions suitable for beginners. Medium - craft questions that require deeper understanding and analysis, appropriate for bachelor's or master's level students. Hard - construct challenging questions that test critical thinking, problem-solving, and advanced knowledge. Prioritize creativity and avoid overly simplistic or predictable questions, incorporate diverse question formats, carefully consider the intended audience, and employ vocabulary and concepts that align with the specified difficulty level. Important: only 1 question, 1 correct answer, 3 incorrect options must be per question, and correct answer must not be repeated in options. Strictly follow difficulty level, and generate unique questions."

    const outputFormatPrompt = " give strict output in valid json string: {question: question, answer: answer, option1: option1, option2: option2, option3: option3}, strict note options must be different than correct answer, only answer must be correct and all other three options must be incorrect, max length of answer, and options strictly less than 15 words, strictly return only one valid json string having array of question json string eg: \"{questions:[{Q1}, {Q2}]}}\". make sure options, answer, and question should not be null. follow strict output form in valid json string only that can be parse into json object. Before providing response, check at your end that generated questions have met given all the conditions. If not then regenerate response. Ensure question and only one answer must be correct.";

    return generatePrompt(systemPrompt, outputFormatPrompt, str);
}

export { generate_mcq, generate_blanks };
