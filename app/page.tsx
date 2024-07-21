import axios from "axios";
import InputContainer from "./components/main-container/InputContainer";
import getOneTenAndKSimilarlity from "@/util/functions/getOneTenAndK";
import Footer from "./components/main-container/Footer";
import Header from "./components/main-container/Header";
import SettingAlertContainer from "./components/main-container/SettingAlertContainer";
import { cookies } from "next/headers";
import APP_URL from "./APP_URL";
import Navbar from "./components/main-container/Navbar";

export interface TodayIndexType {
  word : string;
  yesterday : string;
  tomarrow : string;
  index : number;
  darkmode: {[key :string] :string};
}

export default async function Home() {

  // 다크모드 쿠키 불러오기
  let darkmode = cookies().get('mode') as {[ket :string] :string};

  if(darkmode === undefined){
    darkmode = {mode : 'darkmode', value : 'light'};
  }

  // 오늘의 단어 선별하는 API
  let selectTodayAnswer = await axios(`${APP_URL}/api/word/answer`);  
  
  // 유사어 중에서 1, 10, 1000번째 순서를 가진 단어 불러오기
  let oneTenAndKSimilarityArr = await getOneTenAndKSimilarlity();

  // 정답과 오늘이 기준 날짜로부터 몇번째 정답인지 담긴 객체
  let todayIndex :TodayIndexType = {...selectTodayAnswer.data, darkmode : darkmode};

  return (
    <>
      {/* <SaveSimilarWordsContainer /> */}
      <Navbar />
      <SettingAlertContainer darkmode={darkmode} />  
      <div className="main-container">
        <Header />
        <p className="m-0 mt-sm-4 mb-sm-4 mt-1 mb-3">
          {todayIndex.index}번째 꼬들꼬들의 정답 단어를 맞혀보세요.
          <br/>
          정답 단어와 가장 유사한 단어의 유사도는{' '} 
          <b>{oneTenAndKSimilarityArr[0].similarity}</b>
          {' '}입니다. 
          10번째로 유사한 단어의 유사도는 {oneTenAndKSimilarityArr[1].similarity}이고, 
          1,000번째로 유사한 단어의 유사도는 {oneTenAndKSimilarityArr[2].similarity} 입니다.
        </p>
        <InputContainer {...todayIndex} />
        <Footer />
      </div>
    </>
  );
}

// 내일의 단어 db에 업데이트하는 문장
// let updateTomarrowAnswer = await insertAnswer(selectTodayAnswer.data.tomarrow, 'tomarrow');

// db 유사어 업데이트
// const saveSimilarWords = await axios.post(`${APP_URL}/api/word/similar`);

// frequent words 어레이로 변경하는 api
// let checkFrequency = await axios(`${APP_URL}/api/word/frequency`);  

// 유사어 파일 생성하는 api
// let saveSimilarWords = await axios.post(`${APP_URL}/api/word/similar`);