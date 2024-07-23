import { cookies } from "next/headers";
import GetSimilarlityContainer from "./GetSimilarlityContainer";


export default async function TodayWord (){

    // 다크모드 쿠키 불러오기
    let darkmode = cookies().get('mode') as {[key :string] :string};

    return(
        <GetSimilarlityContainer darkmode={darkmode} />
    )
}