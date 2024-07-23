import axios from "axios";
import getOneTenAndKSimilarlity from "./getOneTenAndK";
import { TodayIndexType } from "@/app/components/main-container/page-container/MainContainer";

/** MainContainer 컴포넌트에서 필요한 데이터를 불러오는 함수 */
export default async function fetchMainContentData(darkmode : {[key :string] :string}){
    // 오늘의 단어 선별하는 API
    let selectTodayAnswer = await axios('/api/word/answer');  
    
    // 유사어 중에서 1, 10, 1000번째 순서를 가진 단어 불러오기
    let oneTenAndKSimilarityArr = await getOneTenAndKSimilarlity();
    // 정답과 오늘이 기준 날짜로부터 몇번째 정답인지 담긴 객체 + 다크모드 여부
    let todayIndex :TodayIndexType = {...selectTodayAnswer.data, darkmode : darkmode};

    return { oneTenAndKSimilarityArr, todayIndex };
}
