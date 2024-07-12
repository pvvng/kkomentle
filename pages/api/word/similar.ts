import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";
import detectSimilarWords from '@/util/functions/detectSimilarWords';

export default async function handler(req :NextApiRequest, res :NextApiResponse){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        const similarityData = await detectSimilarWords(); // fetchData는 실제 데이터를 가져오는 함수로 대체되어야 합니다.
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

