import { connectDB } from "@/util/database";
import { Document, ObjectId, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse){
    const db = (await connectDB).db('kkomentle');
    const getResultArr = await db.collection('try-count').find().toArray();

    return res.status(200).json('dd');
}