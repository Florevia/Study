import { pipeline } from "@huggingface/transformers";

// 创建特征提取器
const extractor = await pipeline(
  "feature-extraction",
  "sentence-transformers/all-MiniLM-L6-v2"
);
// 文本变向量
export async function embed(text: string): Promise<number[]> {
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

export async function embedBatch(chunks: string[]): Promise<number[][]> {
  const vectorChunks = chunks.map((chunk) => embed(chunk));
  const result = await Promise.all(vectorChunks);
  return result;
}
