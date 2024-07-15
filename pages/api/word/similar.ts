import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";
import detectSimilarWords from '@/util/functions/detectSimilarWords';

/** 오늘의 정답과 유사어의 단어 유사도 비교해서 파일로 저장하는 API */
export default async function handler(req :NextApiRequest, res :NextApiResponse){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        const similarityData = await detectSimilarWords();
        console.log(similarityData);
    
        const filePath = path.join(process.cwd(), 'data', 'today_similarity_words.ts');
        const content = `export const SIMILARITY = ${JSON.stringify(similarityData)};`;
    
        fs.writeFileSync(filePath, content);
    
        console.log('Similarity data saved successfully.');
    
        res.status(200).json({ message: 'Similarity data saved successfully.' });
    } catch (error) {
        console.error('Error saving similarity data:', error);
        res.status(500).json({ message: 'Error saving similarity data' });
    }
}

