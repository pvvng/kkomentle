import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import moment from "moment-timezone";

export default async function getTodaySimilar(req :NextApiRequest, res :NextApiResponse){
    // 디바이스 시간을 한국시로 포맷
    const userNowDate = new Date();
    const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
    const formattedTodayDate = koreanNowDate.format('YYYY-MM-DD');

    const db = (await connectDB).db('kkomentle');
    const getTodaySimilarData = await db.collection('similarity')
    .findOne({date : formattedTodayDate}) 

    if(!getTodaySimilarData){
        return res.status(400)
    }

    return res.status(200).json(getTodaySimilarData.similarity)
}