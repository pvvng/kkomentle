import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const newName: string = req.body.name;
        const userEmail: string = req.body.email;

        if (!newName || !userEmail) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const db = (await connectDB).db('kkomentle');
        const updateResult = await db.collection('userdata')
            .updateOne(
                { email: userEmail },
                { $set: { name: newName } }
            );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.redirect(302, '/my-page');
    } catch (error) {
        console.error('Error updating user name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
