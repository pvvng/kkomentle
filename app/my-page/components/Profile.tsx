import { BadBoyBadge, DefaultBadge, GhostBadge, KingBadge, StarBadge } from '../../components/badge-container/badge-components'
import { cookies } from "next/headers";
import './profile.css'
import { getServerUserData } from '@/util/functions/getServerUserData';

const BADGE_ARR = [
    {component : <DefaultBadge/>, title : '꼬들꼬들'},
    {component : <StarBadge/>, title : '별 꼬들꼬들'},
    {component : <GhostBadge/>, title : '유령 꼬들꼬들'},
    {component : <BadBoyBadge/>, title : '악동 꼬들꼬들'},
    {component : <KingBadge/>, title : '악마 꼬들꼬들'},
]

export default async function ProfileContainer(){
    // 다크모드 쿠키 불러오기
    let darkmode = cookies().get('mode') as {[ket :string] :string};

    // 쿠키가 아직 등록되지 않았으면 임시로 적용하기
    if(darkmode === undefined){
        darkmode = {mode : 'darkmode', value : 'light'};
    }

    // 로그인 테스트
    const userdata = await getServerUserData();

    console.log(userdata)

    return (
        <div className='main-profile-container' style={{
            background : darkmode.value === 'dark' ? 'black' : 'white'
        }}>
            <div className='row'>
                <h2 className='content-profile-title'>나의 프로필</h2>
                <div className='badge-container'>
                    <img src='/꼬들꼬들마스코트.png' width="100%" />
                </div>
                <h2 className='content-title text-center'>꼬들꼬들</h2>
                <div className='user-container'>
                    <label htmlFor='user-name'>name</label>
                    <input id='user-name' className='w-100 profile-input-container' />
                    <label htmlFor='user-email'>email</label>
                    <input id='user-email' className='w-100 profile-input-container' disabled />
                </div>
                <div className='content-cotanier'>
                    <hr/>
                    <h2>뱃지</h2>
                    {
                        BADGE_ARR.map(ba => 
                            <div className='locked-badges mb-2' key={ba.title}>
                                <div 
                                    className='row w-100' 
                                    style={{
                                        margin : 'auto', 
                                        justifyContent : 'center', 
                                        alignItems : 'center'
                                    }}
                                >
                                    <div className='col-4 p-2'>
                                        {ba.component}
                                    </div>
                                    <div className='col-8 p-2 text-center'>
                                        <span className='fs-4'>{ba.title}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <button className={
                    darkmode.value === 'dark'? 
                    'hidden-button rounded-1 border-1 pt-1 pb-1 w-100 dark-mode-input-and-btn':
                    'hidden-button rounded-1 border-1 pt-1 pb-1 w-100'
                }>수정</button>
            </div>

        </div>
    )
}