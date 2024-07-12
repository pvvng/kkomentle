import insertAnswer from "@/util/functions/insertAnswer";
import axios from "axios";
import InputContainer from "./components/InputContainer";
import getOneTenAndK from "@/util/functions/getOneTenAndK";


export default async function Home() {

  // 오늘의 단어 선별하는 API
  let selectTodayAnswer = await axios('http://localhost:3000/api/word/answer');  
  // // 오늘의 단어 업데이트하는 문장
  let updateTodayAnswer = await insertAnswer(selectTodayAnswer.data.word);
  // // frequent words 어레이로 변경하는 api
  // let checkFrequency = await axios('http://localhost:3000/api/word/frequency');  
  // 유사어 파일 생성하는 api
  // let saveSimilarWords = await axios.post('http://localhost:3000/api/word/similar')
  // console.log(saveSimilarWords);
  
  let oneTenAndKArr = getOneTenAndK();

  return (
    <>
      <hr/>
      <div className="main-container">
        <h2>꼬들꼬들 - 단어 유사도 추측 게임</h2>
        <p className="m-0 mt-4 mb-4">
          {selectTodayAnswer.data.index + 1}번째 꼬들꼬들의 정답 단어를 맞혀보세요.
          <br/>
          정답 단어와 가장 유사한 단어의 유사도는{' '} 
          <b>{oneTenAndKArr[0].similarity}</b>
          {' '}입니다. 
          10번째로 유사한 단어의 유사도는 {oneTenAndKArr[1].similarity}이고, 
          1,000번째로 유사한 단어의 유사도는 {oneTenAndKArr[2].similarity} 입니다.
        </p>
        <InputContainer />
      </div>
    </>
  );
}


