import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/** 오늘의 정답 설정하는 API */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'secrets.txt');
        
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const words = fileContents.split('\n').map(word => word.trim()).filter(Boolean);
        
        if (words.length === 0) {
            throw new Error('No words found in the file');
        }

        // 기준 날짜 설정 /[년, 월 + 1, 일 - 1]로 설정됨
        // ex. 2024,7,11 => 2024-08-09
        // 설정된 기준시는 2024-07-10T15:00:00.000Z
        const startDate = new Date(2024, 6, 11);
        const today = new Date();
        
        // 타임스탬프로 변환
        const startDateTimestamp = startDate.getTime();
        const todayTimestamp = today.getTime();

        // 일 단위 차이를 계산
        const dayDiff = Math.floor((todayTimestamp - startDateTimestamp) / (1000 * 60 * 60 * 24));

        const wordIndex = dayDiff % words.length;
        const todayWord = words[wordIndex];
        console.log(`Today's word: ${todayWord}`);

        res.status(200).json({ word: todayWord, index : wordIndex });
    } catch (error) {
        console.error('Error reading word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
