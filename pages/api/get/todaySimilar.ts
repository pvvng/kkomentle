import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import moment from "moment";

export default async function getTodaySimilar(req :NextApiRequest, res :NextApiResponse){
    const formattedTodayDate = moment().format('YYYY-MM-DD');
    const db = (await connectDB).db('kkomentle');
    const getTodaySimilarData = await db.collection('similarity')
    .findOne({date : formattedTodayDate}) 

    if(!getTodaySimilarData){
        return res.status(400)
    }

    return res.status(200).json(getTodaySimilarData.similarity)
}