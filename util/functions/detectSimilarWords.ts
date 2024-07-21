import APP_URL from "@/app/APP_URL";
import { FREQUENT_WORDS_ARR } from "@/data/frequent";
import axios from "axios";

/** 유사도 단어를 순회하며 정답 단어와 유사어의 코사인 유사도를 비교하는여 리턴하는 함수 */
export default async function detectSimilarWords(date : string) {
  try {
    let resDataArr = [];

    for (let fwa of FREQUENT_WORDS_ARR) {
      try {
        let res = await axios.get(`${APP_URL}/api/get/checkAnswer?answer=${encodeURIComponent(fwa)}&date=${date}`);
        resDataArr.push(res.data);
      } catch (error) {
        console.error(`Error fetching data for '${fwa}':`, error);
        // 요청 실패 시 처리할 코드 작성
        resDataArr.push({ error: error });
      }
    }

    return resDataArr;
  } catch (error) {
    console.error('Error in detectFrequentWords:', error);
    throw error;
  }
}
