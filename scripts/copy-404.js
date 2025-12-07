import { copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '..', 'dist');
const indexHtml = join(distPath, 'index.html');
const notFoundHtml = join(distPath, '404.html');

try {
  copyFileSync(indexHtml, notFoundHtml);
  console.log('✅ 404.html 파일이 성공적으로 생성되었습니다.');
} catch (error) {
  console.error('❌ 404.html 파일 생성 중 오류 발생:', error);
  process.exit(1);
}

