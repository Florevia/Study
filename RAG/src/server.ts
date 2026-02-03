import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { chunking } from "./chunking.ts";
import { embedBatch, embed } from "./embedding.ts";
import { indexToChroma, searchFromChroma } from "./indexing.ts";
import { openai } from "./index.ts";

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 文件上传配置
const upload = multer({
  dest: path.join(import.meta.dirname, "../uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// 确保 uploads 目录存在
const uploadsDir = path.join(import.meta.dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 健康检查
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 上传文档并索引
app.post(
  "/api/documents",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const content = fs.readFileSync(req.file.path, "utf-8");
      const chunks = chunking(content, 400);
      const vectors = await embedBatch(chunks);
      await indexToChroma(chunks, vectors);

      // 清理上传的临时文件
      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        message: "Document indexed successfully",
        chunksCount: chunks.length,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 语义搜索
app.post(
  "/api/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.body;
      if (!query) {
        res.status(400).json({ error: "Query is required" });
        return;
      }

      const queryVector = await embed(query);
      const result = await searchFromChroma(queryVector);

      res.json({
        success: true,
        documents: result.documents?.[0] || [],
        distances: result.distances?.[0] || [],
      });
    } catch (error) {
      next(error);
    }
  }
);

// RAG 问答对话
app.post(
  "/api/chat",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.body;
      if (!query) {
        res.status(400).json({ error: "Query is required" });
        return;
      }

      // 1. 语义搜索相关文档
      const queryVector = await embed(query);
      const result = await searchFromChroma(queryVector);

      // 2. 构建 prompt
      const documents = result.documents?.[0] || [];
      const prompt = `根据以下文档回答问题：
${documents
  .map((item: string, i: number) => `文档${i + 1}: \n ${item}`)
  .join("\n\n\n")}
问题：${query}

注意：答案需要给出引文，通过这种格式: 
xxx是什么xxx [@文档x]
`;

      // 3. 调用 AI
      const response = await openai(prompt);

      res.json({
        success: true,
        answer: response,
        sources: documents,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 错误处理中间件
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 RAG Server running at http://localhost:${PORT}`);
  console.log(`   - Health: GET  /api/health`);
  console.log(`   - Upload: POST /api/documents`);
  console.log(`   - Search: POST /api/search`);
  console.log(`   - Chat:   POST /api/chat`);
});
