import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    guessedWord: string;
    date: string;
    playtime: number;
    try: number;
    isLogin: string | undefined;
}

interface DBUserDataType {
    email: string;
    name: string;
    topTime: number;
    topIndex: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: '허용되지 않은 메소드입니다.' });
        }

        const putter: BodyType = req.body;

        const db = (await connectDB).db('kkomentle');

        if (typeof putter.isLogin === 'string') {
            const userdataCollection = db.collection('userdata');
            
            let userData: DBUserDataType | null = null;
            try {
                // 로그인 한 경우라면 userdata 불러오기
                userData = await userdataCollection.findOne({ email: putter.isLogin }) as DBUserDataType | null;
            } catch (error) {
                console.error('Error finding user data:', error);
                return res.status(500).json({ error: 'User data lookup failed' });
            }

            if (userData) {
                const updatedFields: Partial<DBUserDataType> = {};

                // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
                if (userData.topTime === -1 || userData.topTime > putter.playtime) {
                    updatedFields.topTime = putter.playtime;
                }
                // userdata에 저장된 값이 -1 일 경우 무조건 업데이트
                if (userData.topIndex === -1 || userData.topIndex > putter.try) {
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

        return res.status(200).json('db업데이트 완료');
    } catch (error) {
        console.error('Database update error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
