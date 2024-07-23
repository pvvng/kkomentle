import axios from 'axios';
import insertAnswer from '@/util/functions/insertAnswer';
import type { Handler } from "@netlify/functions";
import APP_URL from '@/app/APP_URL';

/**  Nelify function 
 * 
 * 매일 자정 실행되어 db에 내일의 단어를 업데이트 
 * */
export const handler :Handler = async (event, context) => {
  try {

    // 오늘의 단어 선별하는 API
    let selectTodayAnswer = await axios(`${APP_URL}/api/word/answer`);  
    // 내일의 단어 db에 업데이트하는 문장
    let updateTomarrowAnswer = await insertAnswer(selectTodayAnswer.data.tomarrow);
    // db 유사어 업데이트
    // const saveSimilarWords = await axios.post(`${APP_URL}/api/word/similar`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Words updated successfully' }),
    };
  } catch (error) {
    console.error('Error updating words:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating words' }),
    };
  }
};