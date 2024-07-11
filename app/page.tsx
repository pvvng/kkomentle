import insertAnswer from "@/util/functions/insertAnswer";
import axios from "axios";
import InputContainer from "./components/InputContainer";
import { FREQUENT_WORDS_ARR } from "@/data/frequent";

export default async function Home() {

  // 오늘의 단어 선별하는 API
  let selectTodayAnswer = await axios('http://localhost:3000/api/word/answer');  
  // 오늘의 단어 업데이트하는 문장
  let updateTodayAnswer = await insertAnswer(selectTodayAnswer.data.word);
  // frequent words 어레이로 변경하는 api
  let checkFrequency = await axios('http://localhost:3000/api/word/frequency');  

  return (
    <>
      <hr/>
      <div className="main-container">
        <h2>꼬들꼬들 - 단어 유사도 추측 게임</h2>
        <p>{selectTodayAnswer.data.index + 1}번째 꼬들꼬들의 정답 단어를 맞혀보세요.</p>
        <InputContainer />
      </div>
    </>
  );
}