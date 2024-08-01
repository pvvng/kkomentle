import Image from "next/image";
import { SignInBtn, SignOutBtn } from "./SignBtn";
import { cookies } from "next/headers";
import { getServerUserData } from "@/util/functions/getServerUserData";
import Link from "next/link";

export default async function Navbar(){
    // 다크모드 쿠키 불러오기
    let darkmode = cookies().get('mode') as {[ket :string] :string};

    // 쿠키가 아직 등록되지 않았으면 임시로 적용하기
    if(darkmode === undefined){
        darkmode = {mode : 'darkmode', value : 'light'};
    }

    // 로그인 테스트
    const userdata = await getServerUserData();

    return(
        <>
            <div className="text-center p-2">
                <div className="w-100 row" style={{maxWidth:'640px', margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
                <Link className="col-6 text-start" href="/">
                    <Image 
                        src='/꼬들꼬들마스코트.png' 
                        alt="꼬들꼬들" 
                        width="64" 
                        height="56" 
                        priority
                    />
                </Link>
                <div className="col-6 text-end">
                    {
                        !userdata?
                        <SignInBtn darkmode = {darkmode} />:
                        <SignOutBtn darkmode = {darkmode} />
                    }
                </div>
                </div>
            </div>
            <hr className="mt-0" />
        </>
    )
}