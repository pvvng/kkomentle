import axios from 'axios';
import insertAnswer from '@/util/functions/insertAnswer';
import { Handler } from '@netlify/functions';

/**  Nelify function 
 * 
 * 1. 매일 자정 실행되어 db에 오늘의 단어를 업데이트 
 * 2. db 유사도를 삭제/업데이트/추가 하는 함수 
 * */
export const handler: Handler = async (event, context) => {
  try {

    // 오늘의 단어 선별하는 API
    let selectTodayAnswer = await axios('http://localhost:3000/api/word/answer');  
    // 내일의 단어 db에 업데이트하는 문장
    let updateTomarrowAnswer = await insertAnswer(selectTodayAnswer.data.tomarrow, 'tomarrow');
    // db 유사어 업데이트
    const saveSimilarWords = await axios.post('http://localhost:3000/api/word/similar');

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
