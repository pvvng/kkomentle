import axios from "axios";
import InputContainer from "./components/InputContainer";
import getOneTenAndKSimilarlity from "@/util/functions/getOneTenAndK";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SettingAlertContainer from "./components/SettingAlertContainer";
import { cookies } from "next/headers";

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

  // 오늘의 단어 선별하는 API
  let selectTodayAnswer = await axios('http://localhost:3000/api/word/answer');  
  
  // 유사어 중에서 1, 10, 1000번째 순서를 가진 단어 불러오기
  let oneTenAndKSimilarityArr = await getOneTenAndKSimilarlity();

  // 정답과 오늘이 기준 날짜로부터 몇번째 정답인지 담긴 객체
  let todayIndex :TodayIndexType = {...selectTodayAnswer.data, darkmode : darkmode};

  return (
    <>
      {/* <SaveSimilarWordsContainer /> */}
      <div className="text-center p-2">
        <a href="https://github.com/pvvng/kkomentle">
          <img src='/꼬들꼬들마스코트.png' width="40px" height="auto" alt="꼬들꼬들" />
        </a>
      </div>
      <hr className="mt-0" />
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
// const saveSimilarWords = await axios.post('http://localhost:3000/api/word/similar');

// frequent words 어레이로 변경하는 api
// let checkFrequency = await axios('http://localhost:3000/api/word/frequency');  

// 유사어 파일 생성하는 api
// let saveSimilarWords = await axios.post('http://localhost:3000/api/word/similar');


