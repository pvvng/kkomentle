import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";

export default async function handler (req :NextApiRequest, res :NextApiResponse){
    try {
        // 허용된 메소드 확인
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        const putterWinstate :number = req.body.winstate;
        const putterGuesses : JsonSimilarityType[] = req.body.gusses;
        const putterPlaytime : number = req.body.playtime;
        let putterTryCount :number = -1;
        
        putterGuesses?.map(psg => {
            if(psg.rank === 0){
                // 정답 단어 몇번만에 맞췄는지 기재
                putterTryCount= psg.index || -1;
            }
        });

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
            const userdata = await db.collection('userdata')
                .findOne({ email: userEmail });

            let topTime :number = -1;
            let topIndex :number = -1;

            // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
            if (userdata?.topTime === -1 || (userdata?.topTime || -1 > putterPlaytime)) {
                topTime = putterPlaytime;
            }
            // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
            if (userdata?.topIndex === -1 || (userdata?.topIndex || -1 > putterTryCount)) {
                topIndex = putterTryCount;
            }
                
            const postGuessesResult = await db.collection('userdata')
                .updateOne(
                    { email: userEmail },
                    { $set: { 
                        isWin : putterWinstate,
                        todayGuesses: putterGuesses,
                        todayPlayTime: putterPlaytime,
                        todayTry : putterTryCount,
                        topTime : topTime,
                        topIndex : topIndex
                    }}
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