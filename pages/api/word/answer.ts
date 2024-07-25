import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';

/** 오늘의 정답 설정하는 API */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'secrets.txt');
        
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const words = fileContents.split('\n').map(word => word.trim()).filter(Boolean);
        
        if (words.length === 0) {
            throw new Error('No words found in the file');
        }

        // 설정된 기준시가 2024-07-11 index number "0" 으로 설정된다.
        const startDate = moment.tz('2024-07-11', 'Asia/Seoul').startOf('day');
        const today = moment.tz('Asia/Seoul').startOf('day');
        
        // 일 단위 차이를 계산
        const dayDiff = today.diff(startDate, 'days');

        const wordIndex = dayDiff % words.length;
        const yesterdayWord = words[wordIndex - 1];
        const todayWord = words[wordIndex];
        const tomarrowWord = words[wordIndex + 1];

        res.status(200).json({ word: todayWord, index : wordIndex, tomarrow : tomarrowWord, yesterday : yesterdayWord });
    } catch (error) {
        console.error('Error reading word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
