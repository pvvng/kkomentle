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

    return (
        <form action="/api/post/username" method="POST">
            <div className='main-profile-container' style={{
                background : darkmode.value === 'dark' ? 'black' : 'white'
            }}>
                <div className='row w-100' style={{margin : 'auto'}}>
                    <div className='col-md-6'>
                        <h2>나의 프로필</h2>
                        <div className='badge-container'>
                            <img src='/꼬들꼬들마스코트.png' width="100%" />
                        </div>
                        <div className='user-container'>
                            <label htmlFor='user-name'>name</label>
                            <input 
                                name='name' 
                                id='user-name' 
                                className='w-100 profile-input-container' 
                                defaultValue={userdata?.name} 
                                pattern="^[가-힣a-zA-Z0-9]+$" 
                                title="빈칸과 특수문자는 이름에 포함될 수 없어요." 
                                required 
                                autoComplete="off"
                                autoCorrect="off"
                                type="text"
                            />
                            <label htmlFor='user-email'>email</label>
                            <input id='user-email' className='w-100 profile-input-container' disabled defaultValue={userdata?.email} />
                            <input name="email" id='hidden-user-email' className='w-100 profile-input-container' defaultValue={userdata?.email} style={{display:'none'}} />
                        </div>
                    </div>

                    <div className='col-md-6 mt-md-0 mt-3'>
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
                                        <div className='col-3 p-2'>
                                            {ba.component}
                                        </div>
                                        <div className='col-9 p-2 text-center'>
                                            <span className='fs-4'>{ba.title}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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