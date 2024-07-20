import getEmbedding from "@/util/functions/getEmbedding";
import axios from "axios";
import moment from "moment";
import { connectDB } from "../database";

/** db에 오늘의 단어 추가 하는 함수 */
export default async function insertAnswer(todayAnswer :string, type :string) {

  let formatteddate :string = moment().format('YYYY-MM-DD');
  // 날짜 형식 포맷
  if (type === 'tomarrow'){
    // 오늘의 날짜가 아니라면 다르게 등록시키기
    formatteddate = moment().add(1, 'days').format('YYYY-MM-DD');
  }

  // db에서 오늘 날짜에 맞는 정답 데이터 받아오기
  const db = (await connectDB).db('kkomentle');
  const findDateResult = await db.collection('answer').findOne({date : formatteddate});

  // db에 오늘의 정답이 등록되지 않았을 때만 등록시키기
  if(!findDateResult){
    try {
      let embedding = await getEmbedding(todayAnswer);
      let res = await axios.post('http://localhost:3000/api/post/answer', {
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