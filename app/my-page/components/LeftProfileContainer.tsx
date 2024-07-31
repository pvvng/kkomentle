import { getImage } from "@/app/components/badge-container/getBadgeImageContainer";
import { UserDataType } from "@/util/functions/getServerUserData";

interface PropsType {
    userdata : UserDataType | undefined;
    userImageStatus: string | undefined
}

export default function LeftProfileContainer({userdata, userImageStatus} : PropsType){
    return(
        <>
            <div className='badge-container'>
                <div className='m-4 mb-4' style={{width : '80%', margin : 'auto'}}>
                    {getImage(userImageStatus)}
                </div>
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
        </>
    )
}