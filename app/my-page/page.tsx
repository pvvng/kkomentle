import Navbar from "../components/main-container/page-container/Navbar";
import ProfileContainer from "./components/Profile";

export default async function MyPage(){

    return (
        <>
            <Navbar />
            <div className="main-container">
                <ProfileContainer  />
            </div>
        </>
    )
}