import { connectDB } from "@/util/database";
import { UserDataType } from "@/util/functions/getServerUserData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    guessedWord: string;
    date: string;
    playtime: number;
    try: number;
    isLogin: string | undefined;
    isGaveup : boolean;
    isHintUsed : boolean;
}

/** 사용자의 승리 상태, 최대 기록 변경하는 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: '허용되지 않은 메소드입니다.' });
        }

        const putter: BodyType = req.body;

        const db = (await connectDB).db('kkomentle');

        if (typeof putter.isLogin === 'string') {
            const userdataCollection = db.collection('userdata');
            
            let userData: UserDataType | null = null;
            try {
                // 로그인 한 경우라면 userdata 불러오기
                userData = await userdataCollection.findOne({ email: putter.isLogin }) as UserDataType | null;
            } catch (error) {
                console.error('Error finding user data:', error);
                return res.status(500).json({ error: 'User data lookup failed' });
            }

            if (userData) {
                const updatedFields: Partial<UserDataType> = {};

                // 저장된 winstate 업데이트하기
                if (userData.isWin === -1){
                    updatedFields.isWin = 1
                }

                // 저장된 todayTry 업데이트하기
                if (userData.todayTry === -1){
                    updatedFields.todayTry = putter.try
                }
                
                // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
                if (userData.topTime === -1 || userData.topTime || -1 > putter.playtime) {
                    updatedFields.topTime = putter.playtime;
                }
                // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
                if (userData.topIndex === -1 || userData.topIndex || -1 > putter.try) {
                    updatedFields.topIndex = putter.try;
                }

                // updatedFields를 순회하며 db에 업데이트하기
                if (Object.keys(updatedFields).length > 0) {
                    try {
                        await userdataCollection.updateOne(
                            { email: putter.isLogin },
                            { $set: updatedFields }
                        );
                    } catch (error) {
                        console.error('Error updating user data:', error);
                        return res.status(500).json({ error: 'User data update failed' });
                    }
                }
            }
        }

        // 정답을 맞혔을때만 시행
        if(!putter.isGaveup){
            try {
                // try count db에 업로드
                await db.collection('try-count').insertOne({
                    ...putter,
                    _id: new ObjectId(),
                });
            } catch (error) {
                console.error('Error inserting try-count data:', error);
                return res.status(500).json({ error: 'Data insertion failed' });
            }
        }

        return res.status(200).json('db업데이트 완료');

    } catch (error) {
        console.error('Database update error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
