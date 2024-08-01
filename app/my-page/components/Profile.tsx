import './profile.css'
import LeftProfileContainer from './LeftProfileContainer';
import RightBadgeArrContainer from "./RightBadgeArrContainer";
import { UserDataType } from "@/util/functions/getServerUserData";
import { cookies } from "next/headers";

export default async function ProfileContainer({userdata} : {userdata : UserDataType | undefined}){

    // 다크모드 쿠키 불러오기
    let darkmode = cookies().get('mode') as {[ket :string] :string};

    // 쿠키가 아직 등록되지 않았으면 임시로 적용하기
    if(darkmode === undefined){
        darkmode = {mode : 'darkmode', value : 'light'};
    }


    // 사용자 이미지, 뱃지 설정
    const userEmail = userdata?.email;
    const userImageStatus = userdata?.image;
    const userBadgeStatus = userdata?.badge;

    if(userdata === undefined) return (
        <div 
            className='row w-100' 
            style={{
                margin : 'auto', 
                justifyContent :'center', 
                alignItems : 'center',
                height : '500px'
            }}>
            <p className='text-center'>로그인 후 이용 가능한 페이지에요.</p>
        </div>    
    )

    return (
        <form action="/api/post/username" method="POST">
            <div className='main-profile-container' style={{
                background : darkmode.value === 'dark' ? 'black' : 'white'
            }}>
                <div className='row w-100' style={{margin : 'auto'}}>
                    <div className='col-md-6'>
                        <h2>나의 프로필</h2>
                        <LeftProfileContainer userdata={userdata} userImageStatus={userImageStatus} />
                    </div>

                    <div className='col-md-6 mt-md-0 mt-3'>
                        <h2>뱃지</h2>
                        <RightBadgeArrContainer userEmail={userEmail} userBadgeStatus={userBadgeStatus} userImageStatus={userImageStatus} />
                    </div>
                    <button 
                        type='submit'
                        className={
                            darkmode.value === 'dark'? 
                            'rounded-1 border-1 pt-1 pb-1 w-100 dark-mode-input-and-btn mt-3':
                            'rounded-1 border-1 pt-1 pb-1 w-100 mt-3'
                        }
                    >수정</button>
                </div>
            </div>
        </form>
    )
}

