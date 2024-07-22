import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";
import moment from 'moment-timezone';

/** 어제의 정답 단어를 리턴하는 API */
export default function handler(req :NextApiRequest, res :NextApiResponse){

    try {
        const filePath = path.join(process.cwd(), 'data', 'secrets.txt');
        
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const words = fileContents.split('\n').map(word => word.trim()).filter(Boolean);
        
        if (words.length === 0) {
            throw new Error('No words found in the file');
        }

        // 한국 표준시 기준 날짜 설정
        // 기준 날짜는 7월 11일
        const startDate = moment.tz("2024-07-11", "Asia/Seoul").startOf('day');
        const today = moment.tz("Asia/Seoul").startOf('day');
        
        // 타임스탬프로 변환
        const startDateTimestamp = startDate.valueOf();
        const todayTimestamp = today.valueOf();

        // 일 단위 차이를 계산
        const dayDiff = Math.floor((todayTimestamp - startDateTimestamp) / (1000 * 60 * 60 * 24));

        const wordIndex = dayDiff % words.length;
        const yesterdayWord = words[wordIndex - 1];

        res.status(200).json({ yesterday : yesterdayWord });
    } catch (error) {
        console.error('Error reading word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}