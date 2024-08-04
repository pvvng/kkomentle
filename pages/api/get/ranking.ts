import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment-timezone";

// interface GetUserDataType{
//     _id : ObjectId;
//     date : string;
//     gussesWord : string;
//     playtime : number;
//     try : number;
//     isLogin : string;
//     isGaveUp : boolean;
//     isHintUsed : boolean;
// }
/** 오늘의 플레이 데이터 불러오기 */
export default async function handler(req :NextApiRequest, res :NextApiResponse){

    try{
        // 허용된 메소드 확인
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
        // 현재 한국 시간 기준 날짜
        const koreanNowDate = moment().tz("Asia/Seoul");
        const formattedTodayDate = moment(koreanNowDate).format('YYYY-MM-DD');

        // db에서 오늘 날짜의 try-count 가져오기
        const db = (await connectDB).db('kkomentle');
        const getTryCount = await db.collection('try-count')
        .find({date : formattedTodayDate})
        .toArray();

        // 점수를 부여하여 정렬
        const scoredTryCount = getTryCount.map(gtc => {
            const playtimeScore = 1000 - gtc.playtime; // playtime이 낮을수록 점수가 높음
            const tryScore = 1000 - gtc.try; // try가 낮을수록 점수가 높음
            gtc.isHintUsed = gtc.isHintUsed;
            gtc.totalScore = playtimeScore + tryScore; // 총 점수 계산
            if(gtc.isHintUsed){
                gtc.totalScore = gtc.totalScore - 500;
            }
            return gtc;
        });

        // 총 점수를 기준으로 내림차순 정렬
        scoredTryCount.sort((a, b) => b.totalScore - a.totalScore);

        // 상위 20개만 추출
        const top20 = scoredTryCount.slice(0, 20);

        // 로그인 한 유저는 이미지, 이름 찾아서 적용하고
        // 로그인 하지 않은 유저는 기본 값으로 설정하기
        await Promise.all(top20.map(async (gtc) => {
            if (gtc.isLogin === undefined) {
                gtc.image = '꼬들꼬들';
                gtc.name = 'user' + (gtc._id).toString().slice(-5);
            } else {
                const userEmail = gtc.isLogin;
                const getUserData = await db.collection('userdata').findOne({ email: userEmail });
                gtc.image = getUserData?.image;
                gtc.name = getUserData?.name;
            }
        }));

        return res.status(200).json(top20);
    }catch(error){
        console.error('Database connection error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
