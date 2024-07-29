import { BadBoyBadge, KingBadge } from './components/badge-container/badge-components'
import './profile.css'

export default function ProfileContainer(){
    return (
        <div className='main-profile-container'>
            <div className='row'>
                <div className='badge-container'>
                    <img src='/꼬들꼬들마스코트.png' width="100%" />
                </div>
                <h2 className='content-title text-center'>꼬들꼬들</h2>
                <div className='user-container'>
                    <label htmlFor='user-name'>name</label>
                    <input id='user-name' className='w-100' />
                    <label htmlFor='user-email'>email</label>
                    <input id='user-email' className='w-100'/>
                </div>
                <div className='content-cotanier'>
                    <div className='locked-badges mb-2'>
                        <div className='row w-100' style={{margin : 'auto'}}>
                            <div className='col-6'>
                                <BadBoyBadge />
                            </div>
                            <div className='col-6'>
                                악동 꼬들꼬들
                            </div>
                        </div>
                    </div>
                    <div className='locked-badges mb-2'>123</div>
                    <div className='locked-badges mb-2'>123</div>
                    <div className='locked-badges mb-2'>123</div>
                    <div className='locked-badges mb-2'>123</div>
                </div>
                <button className='hidden-button'>수정</button>
            </div>

        </div>
    )
}