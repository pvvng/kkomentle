export const dynamic = 'force-dynamic';

import { getServerUserData } from "@/util/functions/getServerUserData";
import SaveSimilarWordsContainer from "../components/SaveSimilarWordsContainer";
import ProfileContainer from "./components/Profile";

export default async function MyPage(){
    
    // 로그인 테스트
    const userdata = await getServerUserData();

    return (
        <>
            <div className="main-container">
                <ProfileContainer userdata={userdata} />
            </div>
            {/* <SaveSimilarWordsContainer /> */}
        </>
    )
}