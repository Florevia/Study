import OpenAI from "openai";

export const openai = async (prompt: string) => {
  // 创建客户端实例
  const client = new OpenAI({
    baseURL: "https://api.xiaomimimo.com/v1",
    apiKey: "sk-sbf6taj31qf9yu6lewokfi6c8mffmzypc7acjoeyu4wd3cz0",
  });

  const response = await client.chat.completions.create({
    model: "mimo-v2-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};
