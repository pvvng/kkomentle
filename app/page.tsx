import Header from "./components/main-container/under-main-container.tsx/Header";
import SettingAlertContainer from "./components/main-container/page-container/SettingAlertContainer";
import Navbar from "./components/main-container/page-container/Navbar";
import MainContainer from "./components/main-container/page-container/MainContainer";
import SaveSimilarWordsContainer from "./components/SaveSimilarWordsContainer";
import { cookies } from "next/headers";
import { getServerUserData, UserDataType } from "@/util/functions/getServerUserData";
import Link from "next/link";
import ProfileContainer from "./Profile";

export default async function Home() {

  // 다크모드 쿠키 불러오기
  let darkmode = cookies().get('mode') as {[key :string] :string};
  // 유저 데이터 불러오기
  const userdata :UserDataType|undefined = await getServerUserData();

  return (
    <>
      <Navbar />
      {/* <SaveSimilarWordsContainer /> */}
      <ProfileContainer />
      <SettingAlertContainer />  
      <div className="main-container">
        <Header />
        <MainContainer darkmode={darkmode} userdata={userdata} />
        <hr/>
        <div className="row w-100" style={{margin : 'auto'}}>
          <Link href="/qna" className="col-4 text-center mt-3 mb-3 header-title" style={{textDecoration : 'none'}}><b>질문과 답변</b></Link>
          <Link href="/ranking" className="col-4 text-center mt-3 mb-3 header-title" style={{textDecoration : 'none'}}><b>랭킹 확인하기</b></Link>
          <Link href="/my-page" className="col-4 text-center mt-3 mb-3 header-title" style={{textDecoration : 'none'}}><b>마이페이지</b></Link>
        </div>
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