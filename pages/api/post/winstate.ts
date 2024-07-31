import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

/** user의 승리 상태와 시도 횟수 변경 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 요청 메소드가 POST가 아닌 경우 405 상태 코드 반환
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '허용되지 않은 메소드입니다.' });
    }

    try {
        // 요청 바디에서 userID와 putter 추출
        const { _id: userID, winstate, tryCount } = req.body;

        // 요청 바디의 유효성 검사
        if (userID === undefined) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // 데이터베이스 연결
        const db = (await connectDB).db('kkomentle');

        // 데이터베이스 업데이트
        const updateResult = await db.collection('userdata').updateOne(
            { _id: new ObjectId(userID) },
            { $set: { isWin: winstate, todayTry : tryCount } }
        );

        // 업데이트 결과 확인
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 성공 응답
        res.status(200).json({ message: 'Win state updated successfully' });

    } catch (error) {
        console.error('Error occurred during update:', error);

        // 에러 응답
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
