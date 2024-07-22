import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    guessedWord : string,
    date : string,
    playtime : number,
    try : number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: '허용되지 않은 메소드입니다.' });
        }

        const putter: BodyType = req.body;

        const db = (await connectDB).db('kkomentle');
        const result = await db.collection('try-count').insertOne({
            ...putter,
            _id: new ObjectId(),
        });

        return res.status(200).json('db업데이트 완료');
    } catch (error) {
        console.error('Database update error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
