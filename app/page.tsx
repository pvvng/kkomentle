import Footer from "./components/main-container/Footer";
import Header from "./components/main-container/Header";
import SettingAlertContainer from "./components/main-container/SettingAlertContainer";
import Navbar from "./components/main-container/Navbar";
import { cookies } from "next/headers";
import { getServerUserData } from "@/util/functions/getServerUserData";
import MainContainer from "./components/main-container/MainContainer";

export default async function Home() {

  // 다크모드 쿠키 불러오기
  let darkmode = cookies().get('mode') as {[ket :string] :string};

  const userdata = await getServerUserData();

  return (
    <>
      <Navbar />
      {/* <SaveSimilarWordsContainer /> */}
      <SettingAlertContainer />  
      <div className="main-container">
        <Header />
        <MainContainer darkmode={darkmode} userdata={userdata} />
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