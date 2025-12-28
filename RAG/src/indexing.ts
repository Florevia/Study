import { ChromaClient } from "chromadb";
// 创建客户端
const client = new ChromaClient({
  host: "192.168.10.131",
  port: 8777,
});
// 创建集合
let collection: any;
try {
  collection = await client.getOrCreateCollection({ name: "vue" });
} catch (error) {
  console.error("Failed to create collection:", error);
}

// 将文本块和向量索引到 Chroma
export async function indexToChroma(chunks: string[], vectors: number[][]) {
  const ids = chunks.map((_, i) => `chunk${i}`);
  await collection.add({
    ids,
    documents: chunks,
    embeddings: vectors,
  });
}
// 从 Chroma 搜索
export async function searchFromChroma(queryVector: number[]) {
  const result = await collection.query({
    queryEmbeddings: [queryVector],
    nResults: 5,
  });
  return result;
}
