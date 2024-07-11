import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/** frequent words 텍스트 문서를 어레이로 변환하는 함수 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const filePath = path.join(process.cwd(), 'data', 'frequent_words.txt');
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
      
        const words = fileContent.split('\n').map(word => word.trim()); // 각 줄의 단어들을 배열로 변환
        // TypeScript 파일 경로 및 이름 설정
        const fileName = 'frequent'; // 파일 이름
        const fileExt = '.ts'; // 파일 확장자
        const newFilePath = path.join(process.cwd(), 'data', `${fileName}${fileExt}`); // 파일 경로 설정

        // TypeScript 코드 생성
        const tsCode = `export const frequent = ${JSON.stringify(words)};`;

        // 파일 쓰기 (기존 파일 덮어쓰기 방지를 위해 파일이 존재하는지 먼저 체크)
        if (!fs.existsSync(newFilePath)) {
            fs.writeFileSync(newFilePath, tsCode, 'utf-8');
            console.log('새로운 TypeScript 파일이 생성되었습니다.');
        } else {
            console.error('파일이 이미 존재합니다.');
        }

        res.status(200).json('check');
    }catch(error){
        console.error('Error reading word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
