export const dynamic = 'force-dynamic';

import Header from "./components/main-container/under-main-container.tsx/Header";
import SettingAlertContainer from "./components/main-container/page-container/SettingAlertContainer";
import Navbar from "./components/main-container/page-container/Navbar";
import MainContainer from "./components/main-container/page-container/MainContainer";
import FooterContainer from "./components/main-container/page-container/Footer";
import { cookies } from "next/headers";
import { getServerUserData, UserDataType } from "@/util/functions/getServerUserData";
import InstallPWAAlertContainer from "./components/hidden-container/InstallPWAAlertContainer";

export default async function Home() {

  // 다크모드 쿠키 불러오기
  let darkmode = cookies().get('mode') as {[key :string] :string};
  // 유저 데이터 불러오기
  const userdata :UserDataType|undefined = await getServerUserData();

  return (
    <>
      <InstallPWAAlertContainer />
      <Navbar />
      <SettingAlertContainer />  
      <div className="main-container">
        <Header />
        <MainContainer darkmode={darkmode} userdata={userdata} />
        <hr/>
        <FooterContainer />
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