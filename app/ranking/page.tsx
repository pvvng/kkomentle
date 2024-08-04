import { cookies } from "next/headers";
import Navbar from "../components/main-container/page-container/Navbar";
import RankingListContainer from "./components/RankingList";
import { getServerUserData, UserDataType } from "@/util/functions/getServerUserData";

export default async function Ranking(){

    // 다크모드 쿠키 불러오기
    let darkmode = cookies().get('mode') as {[key :string] :string};
    // 유저 데이터 불러오기
    const userdata :UserDataType|undefined = await getServerUserData();

    return( 
        <>
            <div className="main-container">
                <RankingListContainer darkmode={darkmode} userdata={userdata} />
            </div>
        </>
    )
} 