import getEmbedding from "@/util/functions/getEmbedding";
import axios from "axios";
import moment from "moment";
import { connectDB } from "../database";

/** db에 오늘의 단어 추가 하는 함수 */
export default async function insertAnswer(todayAnswer :string) {
    // 날짜 형식 포맷
    const formattedDate = moment().format('YYYY-MM-DD');
    // db에서 오늘 날짜에 맞는 정답 데이터 받아오기
    const db = (await connectDB).db('kkomentle');
    const findDateResult = await db.collection('answer').findOne({date : formattedDate});

    if(!findDateResult){
      try {
        let embedding = await getEmbedding(todayAnswer);
        let res = await axios.post('http://localhost:3000/api/post/answer', {
          answer: todayAnswer,
          embedding: embedding,
          date: formattedDate,
        });
        console.log('Answer inserted successfully:', res.data);
      } catch (error) {
        console.error('Error inserting answer:', error);
      } 
    }else{
      console.log('오늘의 정답은 이미 등록되었습니다.');
    }
  }