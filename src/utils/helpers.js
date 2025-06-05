// 유틸리티 함수들
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;

  return date.toLocaleDateString();
};

export const markdownToHtml = (markdown) => {
  // 간단한 마크다운 변환기
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\n/gim, '<br>');
};

export const extractFirstLine = (text) => {
  const lines = text.split('\n');
  const firstLine = lines[0].trim();

  // 마크다운 헤더 제거
  return firstLine.replace(/^#+\s*/, '').slice(0, 50);
};

export const calculateReadingStats = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const readingTime = Math.ceil(words.length / wordsPerMinute);

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    paragraphs: paragraphs.length,
    sentences: sentences.length,
    readingTime: readingTime || 1,
  };
};

export const exportToMarkdown = (document) => {
  return document.content;
};

export const exportToHtml = (document) => {
  const html = markdownToHtml(document.content);
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${document.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
               line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 2px; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
};
