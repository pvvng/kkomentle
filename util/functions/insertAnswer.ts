import getEmbedding from "@/util/functions/getEmbedding";
import axios from "axios";
import moment from "moment-timezone";
import { connectDB } from "../database";
import APP_URL from "@/app/APP_URL";

/** db에 내일의 단어 추가 하는 함수 */
export default async function insertAnswer(todayAnswer :string) {

  // 디바이스 시간을 한국시로 포맷, 날짜 +1일 시키기
  const userNowDate = new Date();
  const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
  const formatteddate = koreanNowDate.add(1, 'days').format('YYYY-MM-DD');

  // db에서 오늘 날짜에 맞는 정답 데이터 받아오기
  const db = (await connectDB).db('kkomentle');
  const findDateResult = await db.collection('answer').findOne({date : formatteddate});

  // db에 오늘의 정답이 등록되지 않았을 때만 등록시키기
  if(!findDateResult){
    try {
      let embedding = await getEmbedding(todayAnswer);
      let res = await axios.post(`${APP_URL}/api/post/answer`, {
        answer: todayAnswer,
        embedding: embedding,
        date: formatteddate,
      });
      console.log('내일의 정답을 성공적으로 등록했습니다:', res.data);
    } catch (error) {
      console.error('정답 등록 중 에러가 발생했습니다:', error);
    } 
  }else{
    console.log('내일의 정답은 이미 등록되었습니다.');
  }
}