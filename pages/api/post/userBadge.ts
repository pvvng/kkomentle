import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

/** 사용자의 뱃지 보유 상태를 변경하는 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {

        // newValue : 바꿀 데이터 값, index : 바꿀 데이터 index number
        const [newValue, index] : [boolean, number] = req.body.badgeArr;
        const userEmail: string = req.body.email;

        if (index < 0 || index > 4) {
            return res.status(400).json({ error : 'not allowed number' });
        }

        const db = (await connectDB).db('kkomentle');
        const updateResult = await db.collection('userdata')
            .updateOne(
                { email: userEmail },
                { $set: {  [`badge.${index}`]: newValue } }
            );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ error: 'Failed to update user' });
        }

        res.status(200).json('이미지 업데이트 완료');
    } catch (error) {
        console.error('Error updating user name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
