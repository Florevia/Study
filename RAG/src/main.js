import { injesting } from "./injesting.js";
import { chunking } from "./chunking.ts";
import { embedBatch, embed } from "./embedding.ts";
import { indexToChroma, searchFromChroma } from "./indexing.ts";
import { openai } from "./index.ts";

const content = injesting("vue.md");
const chunk = chunking(content, 400);
const vector = await embedBatch(chunk);
await indexToChroma(chunk, vector);

const query = "vue有哪些api风格？";
const queryVector = await embed(query);
const result = await searchFromChroma(queryVector);

// 生成prompt
const prompt = `根据以下文档回答问题：
${result.documents[0]
  .map((item, i) => `文档${i + 1}: \n ${item}`)
  .join("\n\n\n")}
问题：${query}

注意：答案需要给出引文，通过这种格式: 
xxx是什么xxx [@文档x]
`;

// console.log(prompt);

// 调用openai
const response = await openai(prompt);

console.log(response);
// result.documents[0].forEach((item, i) =>
//   console.log(
//     "-------------------------------------------\n",
//     result.distances[0][i],
//     item
//   )
// );

// console.log("++++++++++++++++++++++", result.documents[0].length);
