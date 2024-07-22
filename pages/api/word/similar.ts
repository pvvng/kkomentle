import { NextApiRequest, NextApiResponse } from "next";
import detectSimilarWords from '@/util/functions/detectSimilarWords';
import { connectDB } from '@/util/database';
import moment from 'moment-timezone';

/** 오늘의 정답과 유사어의 단어 유사도 비교해서 db에 저장하는 API */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // 디바이스 시간을 한국시로 포맷
    const userNowDate = new Date();
    const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
    // 어제, 오늘, 내일의 날짜 포맷
    const formattedYesterdayDate = koreanNowDate.subtract(1, 'days').format('YYYY-MM-DD');
    // const formattedTodayDate = moment().format('YYYY-MM-DD');
    const formattedTomorrowDate = koreanNowDate.add(1, 'days').format('YYYY-MM-DD');

    const db = (await connectDB).db('kkomentle');
    const similarityCollection = db.collection('similarity');

    if (req.method !== 'POST') {
        return res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }

    try {
        // 어제 기준 내일, 오늘 기준 오늘의 데이터 찾기
        // const findTodayDate = await similarityCollection.findOne({ date: formattedTodayDate });

        // 1. 오늘 기준 어제의 데이터 삭제하기
        try {
            const deleteYesterdaySim = await similarityCollection.deleteOne({ date: formattedYesterdayDate });
            console.log('어제의 유사도 데이터 삭제 완료:', deleteYesterdaySim);
        } catch (deleteError) {
            console.error('어제의 유사도 데이터 삭제 중 에러 발생:', deleteError);
            return res.status(500).json({ message: '어제의 유사도 데이터 삭제 중 에러 발생' });
        }

        // // 2. 오늘의 데이터를 어제 기준 내일의 데이터로 업데이트 하기
        // try {
        //     const updateTodaySim = await similarityCollection.updateOne(
        //         { date: formattedTodayDate },
        //         { $set: { ...findTodayDate } }
        //     );
        //     console.log('오늘의 유사도 데이터 업데이트 완료:', updateTodaySim);
        // } catch (updateTodayError) {
        //     console.error('오늘의 유사도 데이터 업데이트 중 에러 발생:', updateTodayError);
        //     return res.status(500).json({ message: '오늘의 유사도 데이터 업데이트 중 에러 발생' });
        // }

        // 2. 오늘 기준 내일의 데이터를 오늘 기준 내일의 정답을 바탕으로 업데이트하기
        try {
            const similarityTomorrowData = await detectSimilarWords(formattedTomorrowDate);
            const updateTomorrowSim = await similarityCollection.insertOne({
                similarity: similarityTomorrowData,
                date: formattedTomorrowDate,
            });
            console.log('내일의 유사도 데이터 db에 등록 완료:', updateTomorrowSim);
        } catch (updateTomorrowError) {
            console.error('내일의 유사도 데이터 db에 등록 중 에러 발생:', updateTomorrowError);
            return res.status(500).json({ message: '내일의 유사도 데이터 db에 등록 중 에러 발생' });
        }

        res.status(200).json({ message: '유사도 데이터를 성공적으로 저장하였습니다.' });
    } catch (error) {
        console.error('유사도 데이터 저장 중 에러가 발생했습니다.:', error);
        res.status(500).json({ message: '유사도 데이터 저장 중 에러가 발생했습니다.' });
    }
}
