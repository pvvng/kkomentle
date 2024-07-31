export const dynamic = 'force-dynamic';

import { getServerUserData } from "@/util/functions/getServerUserData";
import Navbar from "../components/main-container/page-container/Navbar";
import SaveSimilarWordsContainer from "../components/SaveSimilarWordsContainer";
import ProfileContainer from "./components/Profile";

export default async function MyPage(){
    
    // 로그인 테스트
    const userdata = await getServerUserData();

    return (
        <>
            <Navbar />
            <div className="main-container">
                <ProfileContainer userdata={userdata} />
            </div>
            {/* admin만 접근 가능하게 세팅 */}
            {
                (userdata?.email !== undefined && 
                userdata.email === process.env.ADMIN_EMAIL) 
                && <SaveSimilarWordsContainer />
            }
        </>
    )
}