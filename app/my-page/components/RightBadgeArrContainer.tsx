'use client'

import { BadBoyBadge, DefaultBadge, GhostBadge, KingBadge, StarBadge } from "@/app/components/badge-container/badge-components"
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

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
        {component : <DefaultBadge />, title : '꼬들꼬들'},
        {component : <StarBadge userBadgeStatus={propsUserBadgeStatus[1]} />, title : '별 꼬들꼬들'},
        {component : <GhostBadge userBadgeStatus={propsUserBadgeStatus[2]} />, title : '유령 꼬들꼬들'},
        {component : <BadBoyBadge userBadgeStatus={propsUserBadgeStatus[3]} />, title : '악동 꼬들꼬들'},
        {component : <KingBadge userBadgeStatus={propsUserBadgeStatus[4]} />, title : '악마 꼬들꼬들'},
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
                                ba.title:
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