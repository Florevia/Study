import OpenAI from "openai";
const client = new OpenAI({
    apiKey: "ms-6daa7666-8692-4bf5-a7c4-f90a2b672c51",
    baseURL: "https://api-inference.modelscope.cn/v1",
});

const response = await client.chat.completions.create({
    model: "ZhipuAI/GLM-4.7",
    messages: [{ role: "user", content: "你好" }],
    temperature: 0.5,
});

console.log(response.choices[0].message.content);