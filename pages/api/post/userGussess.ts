import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";

/** 사용자의 추측 배열 (todayGussees) 저장하는 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 허용된 메소드 확인
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        const putterGuesses: JsonSimilarityType = req.body.guessesArr;

        // 입력 데이터 검증
        if (!putterGuesses || !Array.isArray(putterGuesses)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // 데이터베이스 연결
        const db = (await connectDB).db('kkomentle');

        // 현재 사용자가 로그인 했는지 확인
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(200).json('Unauthorized user');
        }

        // 사용자 이메일 검증
        const userEmail = session.user?.email;

        if (!userEmail) {
            return res.status(500).json({ error: 'Error loading user session' });
        }

        // 사용자 데이터 업데이트
        try {
            const postGuessesResult = await db.collection('userdata')
                .updateOne(
                    { email: userEmail },
                    { $set: { todayGuesses: putterGuesses } }
                );

            // 회원가입 되지 않은 사용자 일 때
            if (postGuessesResult.matchedCount === 0) {
                return res.status(404).json({ error: 'User data not found' });
            }

            return res.status(200).json({ message: 'User data successfully updated' });

        } catch (error) {
            console.error('Error updating user data:', error);
            return res.status(500).json({ error: 'Data update failed' });
        }

    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
