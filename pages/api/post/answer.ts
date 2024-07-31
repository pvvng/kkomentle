import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res :NextApiResponse){
    try {
        const db = (await connectDB).db('kkomentle');
        const postAnswerResult = await db.collection('answer').insertOne(req.body);

        return res.status(200).json(postAnswerResult);
    } catch (error) {
        console.error('내일의 정답 업데이트 중 에러 발생:', error);
        return res.status(500).json('서버 오류로 내일의 정답 업데이트 실패');
    }
}