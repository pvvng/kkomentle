import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

/** 마이페이지 사용자 profile image 변경 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const newImage: string = req.body.image;
        const userEmail: string = req.body.email;

        if (newImage === undefined) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const db = (await connectDB).db('kkomentle');
        const updateResult = await db.collection('userdata')
            .updateOne(
                { email: userEmail },
                { $set: { image: newImage } }
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
