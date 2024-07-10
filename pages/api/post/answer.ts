import { connectDB } from "@/util/database";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res :NextApiResponse){

    const formattedDate = moment().format('YYYY-MM-DD');

    try {
        const db = (await connectDB).db('kkomentle');
        const findDateResult = await db.collection('answer').findOne({date : formattedDate})
        if(findDateResult){
            return res.status(200).json('이미 업데이트가 완료된 날짜 입니다.');
        }
        const postAnswerResult = await db.collection('answer').insertOne(req.body);

        // 데이터베이스에 데이터가 성공적으로 추가되면 클라이언트에 응답을 보냅니다.
        return res.status(200).json('오늘의 정답 업데이트 완료');
    } catch (error) {
        // 에러가 발생했을 때, 에러를 콘솔에 기록합니다.
        console.error('오늘의 정답 업데이트 중 에러 발생:', error);
        // 클라이언트에 에러 메시지를 응답합니다.
        return res.status(500).json('서버 오류: 오늘의 정답 업데이트 실패');
    }
}