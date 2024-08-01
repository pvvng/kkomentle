'use client'

import { BadBoyBadge, DefaultBadge, GhostBadge, KingBadge, StarBadge } from "@/app/components/badge-container/badge-components"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PropsType {
    userEmail : string|undefined;
    userBadgeStatus: boolean[] | undefined;
    userImageStatus : string|undefined;
}

export default function RightBadgeArrContainer({userEmail, userBadgeStatus, userImageStatus} : PropsType){

    const router = useRouter();

    let propsUserBadgeStatus :boolean[] = [];
    if(userBadgeStatus === undefined){
        propsUserBadgeStatus = [true, false, false, false, false];
    }else{
        propsUserBadgeStatus = [...userBadgeStatus];
    }

    const BADGE_ARR = [
        {component : <DefaultBadge />, title : '꼬들꼬들', des : '꼬들꼬들하게 생긴 녀석이에요.', get : '(꼬들꼬들에 회원가입하면 얻을 수 있어요.)'},
        {component : <StarBadge userBadgeStatus={propsUserBadgeStatus[1]} />, title : '별 꼬들꼬들', des : '삐죽삐죽한게 제법 귀여운 녀석이에요.', get : '(최초로 힌트 사용 시 얻을 수 있어요.)'},
        {component : <GhostBadge userBadgeStatus={propsUserBadgeStatus[2]} />, title : '유령 꼬들꼬들', des : '귀신같이 재빠른 녀석이에요.', get : '(최초로 정답을 맞히면 얻을 수 있어요.)'},
        {component : <BadBoyBadge userBadgeStatus={propsUserBadgeStatus[3]} />, title : '악동 꼬들꼬들', des: '모르는 집 초인종을 누르고 도망가는게 취미에요.' , get : '(정답을 10분 안에 맞히면 얻을 수 있어요.)'},
        {component : <KingBadge userBadgeStatus={propsUserBadgeStatus[4]} />, title : '악마 꼬들꼬들', des: '온 세상을 꼬들꼬들하게 만드려는 꿈이 있어요.' , get : '(정답을 3번 안에 맞히면 얻을 수 있어요.)'},
    ]
    
    return(
        BADGE_ARR.map((ba, i) => 
            <div 
                className='locked-badges mb-2' 
                key={ba.title}
                onClick={() => {
                    propsUserBadgeStatus[i]?
                    fetchNewImage(userEmail, ba.title, router):
                    alert('아직 획득하지 못한 뱃지에요.');
                }}
            >
                <div 
                    className='row w-100' 
                    style={{
                        margin : 'auto', 
                        justifyContent : 'center', 
                        alignItems : 'center'
                    }}
                >
                    <div className='col-3 p-2'>
                        {ba.component}
                    </div>
                    <div className='col-9 p-2 text-center'>
                        <span 
                            className={
                                userImageStatus !== undefined && 
                                userImageStatus === ba.title ?
                                'text-primary' : 'none' 
                            } 
                        >
                            {
                                propsUserBadgeStatus[i]?
                                <span>
                                    <p className="m-0 fw-bold">{ba.title}</p>
                                    <p className="m-0 my-page-badge-des">{ba.des}</p>
                                </span>:
                                '???'
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    )
}

/** user profile 이미지 변경하는 함수 */
async function fetchNewImage(userEmail :string|undefined, imageName :string, router :AppRouterInstance){
    try{
        if(userEmail === undefined){
            console.log('확인되지 않은 사용자입니다.');
        }else{
            await axios.post('/api/post/userImage', {
                email : userEmail,
                image : imageName
            })
            router.refresh();
        }
    }catch(error){
        console.log('이미지 업데이트 중 에러 발생 : ', error);
    }
}