import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import moment from "moment-timezone";
import { Document, ObjectId, WithId } from "mongodb";

interface GetDataType {
    _id : ObjectId;
    guessedWord : string;
    date : string;
    playtime : number;
    try : number;
    isLogin ?: string;
}

export interface AvgObjectByDateType {
    index ?:number;
    date ?: string;
    answer ?: string;
    tryCount ?: number;
    time ?: number;
    avgTryCount ?: number;
    avgTime ?: number;    
    userCount ?: number;
    percentileTry ?: number;
    percentileTime ?: number;
}

export default async function handler(req : NextApiRequest, res : NextApiResponse){

    try{
        // 허용된 메소드 확인
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
        // 현재 한국 시간 기준 날짜
        const koreanNowDate = moment().tz("Asia/Seoul");
        const formattedTodayDate = moment(koreanNowDate).format('YYYY-MM-DD');
        // 일주일 전 날짜 계산
        const lastWeekDate = moment(koreanNowDate).subtract(7, 'days');
        const formattedLastWeekDate = lastWeekDate.format('YYYY-MM-DD');

        // MongoDB 쿼리
        const query = {
            date: { $gte: formattedLastWeekDate, $lte: formattedTodayDate }
        };
        
        // 데이터베이스 연결
        const db = (await connectDB).db('kkomentle');

        // 현재 사용자가 로그인 했는지 확인
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(200).json('Unauthorized user');
        }

        // 사용자 이메일 검증
        const userEmail = session.user?.email;

        if (!userEmail) {
            return res.status(500).json({ error: 'Error loading user session' });
        }

        try {
            // 지난 일주일 간의 모든 데이터 불러오기
            const rawAllUserData = await db.collection('try-count').find(query).toArray();
            
            // 지난 일주일 간의 유저 데이터만 불러오기
            const rawUserData = await db.collection('try-count')
                .find({ ...query, isLogin: userEmail })
                .toArray();
        
            // 평균 객체 배열 계산
            const AvgObjectByDateArray = await getAverageObjectArray(rawAllUserData, rawUserData);
        
            // 결과를 클라이언트에 반환
            return res.status(200).json(AvgObjectByDateArray);
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        
            // 클라이언트에 에러 응답
            return res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getAverageObjectArray(
    rawAllUserData: WithId<Document>[], 
    rawUserData: WithId<Document>[]
) {
    // 결과를 GetDataType으로 변환
    const LastWeekAllUserData: GetDataType[] = rawAllUserData.map(doc => ({
        _id: doc._id,
        guessedWord: doc.guessedWord,
        date: doc.date,
        playtime: doc.playtime,
        try: doc.try,
    }));

    // 결과를 GetDataType으로 변환
    const lastWeekUserData: GetDataType[] = rawUserData.map(doc => ({
        _id: doc._id,
        guessedWord: doc.guessedWord,
        date: doc.date,
        playtime: doc.playtime,
        try: doc.try,
        isLogin: doc.isLogin
    }));

    let AvgObjectByDateArray: AvgObjectByDateType[] = [];

    LastWeekAllUserData.forEach(lwaud => {
        // 추가할 날짜
        let appendDate = lwaud.date;
        // 문자열에서 마지막 두 글자를 추출
        const lastTwoChars = appendDate.slice(-2);
        // 추출한 문자열을 숫자로 변환
        const indexNumber = parseInt(lastTwoChars, 10);

        // 날짜가 AvgObjectByDateArray에 존재하는지 검사
        let existingEntry = AvgObjectByDateArray.find(entry => entry.date === appendDate);

        if (!existingEntry) {
            // 날짜가 존재하지 않으면 새로운 객체를 추가
            AvgObjectByDateArray.push({
                index: indexNumber,
                date: appendDate,
                answer: lwaud.guessedWord,
                tryCount: lwaud.try,
                time: lwaud.playtime,
                avgTryCount: 0, // 초기값
                avgTime: 0, // 초기값
                userCount: 1 // 초기값
            });
        } else {
            // 날짜가 이미 존재하면 해당 객체의 tryCount와 time을 업데이트
            existingEntry.tryCount = (existingEntry.tryCount || 0) + lwaud.try;
            existingEntry.time = (existingEntry.time || 0) + lwaud.playtime;
            existingEntry.userCount = (existingEntry.userCount || 0) + 1;
        }
    });

    AvgObjectByDateArray.map(aobd => {
        if (aobd.userCount !== 0) {
            aobd.avgTryCount = parseInt(((aobd.tryCount || 0) / (aobd.userCount || 1)).toString());
            aobd.avgTime = parseInt(((aobd.time || 0) / (aobd.userCount || 1)).toString());
        }
    });

    lastWeekUserData.forEach(lwaud => {
        const matchingEntry = AvgObjectByDateArray.find(entry => entry.date === lwaud.date);

        if (matchingEntry) {
            // date 값을 lastWeekUserData의 date로 변경
            matchingEntry.tryCount = lwaud.try;
            matchingEntry.time = lwaud.playtime;

            // 퍼센타일 계산을 위한 데이터 정렬 및 순위 계산
            const sortedAllUserTries = LastWeekAllUserData
                .filter(data => data.date === lwaud.date)
                .sort((a, b) => a.try - b.try);
            
            const sortedAllUserTimes = LastWeekAllUserData
                .filter(data => data.date === lwaud.date)
                .sort((a, b) => a.playtime - b.playtime);

            const calculatePercentile = (sortedData: GetDataType[], userValue: number) => {
                const rank = sortedData.findIndex(data => data.try === userValue || data.playtime === userValue) + 1;
                return ((rank - 1) / sortedData.length) * 100;
            };

            const percentileTry = calculatePercentile(sortedAllUserTries, lwaud.try);
            const percentileTime = calculatePercentile(sortedAllUserTimes, lwaud.playtime);

            // 퍼센타일 결과 추가
            matchingEntry.percentileTry = parseInt(percentileTry.toFixed(0));
            matchingEntry.percentileTime = parseInt(percentileTime.toFixed(0));
        }
    });

    return AvgObjectByDateArray;
}