/**
 * 将字符串按指定大小切割成数组
 * @param content - 要切割的字符串
 * @param size - 每个块的大小，默认为 10
 * @returns 切割后的字符串数组
 */
export const chunking = (content: string, size = 10): string[] => {
  if (!content || size <= 0) return [];

  const chunkCount = Math.ceil(content.length / size);
  return Array.from({ length: chunkCount }, (_, i) =>
    content.slice(i * size, (i + 1) * size)
  );
};
