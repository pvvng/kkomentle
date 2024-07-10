import { connectDB } from "@/util/database";
import getEmbedding from "@/util/functions/getEmbedding";
import cosineSimilarity from "cosine-similarity";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

/** db의 오늘의 정답과 사용자가 입력한 쿼리의 코사인 유사도를 비교하는 함수 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // 오늘의 날짜 포맷
    const formattedDate = moment().format('YYYY-MM-DD');

    if (req.method === "GET") {
        try {
            // 사용자의 쿼리가 문자열 배열인 경우 첫 번째 요소를 문자열로 추출
            const answer = Array.isArray(req.query.answer) ? req.query.answer[0] : req.query.answer || '';

            // db에서 오늘의 정답 임베딩 불러오기
            const db = (await connectDB).db('kkomentle');
            const findDateResultPromise = db.collection('answer').findOne({ date: formattedDate });

            // getEmbedding 함수로 사용자 입력에 대한 임베딩을 비동기적으로 가져오는 promise
            const requestVectorPromise = getEmbedding(answer);

            // Promise.all을 사용하여 두 개의 비동기 작업을 병렬로 처리
            const [findDateResult, requestVector] = await Promise.all([findDateResultPromise, requestVectorPromise]);

            if (!findDateResult) {
                return res.status(500).json('정보를 불러오는 중 오류가 발생했습니다.');
            }

            const answerVector = findDateResult.embedding;

            let similarity = cosineSimilarity(answerVector, requestVector);
            // 정답과 쿼리가 일치한다면 type이 string인 100 반환
            if (parseInt(similarity.toString()) >= 100){
                similarity = 100;
            }

            // handleLocalStorage({ 
            //     answer: findDateResult.answer, 
            //     query: answer, 
            //     similarity: similarity 
            // });
            
            return res.redirect(302, '/');
        } catch (error) {
            console.error("Error in get embedding:", error);
            return res.status(500).json({ error: "Failed to get embedding" });
        }

    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
