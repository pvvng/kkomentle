import Image from "next/image";
import { SignInBtn, SignOutBtn } from "./SignBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Navbar(){
    // 로그인 테스트
    let session = await getServerSession(authOptions);
    console.log(session)
    return(
        <>
            <div className="text-center p-2">
                <div className="w-100 row" style={{maxWidth:'640px', margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
                <a className="col-6 text-start" href="https://github.com/pvvng/kkomentle" target="_blank">
                    <Image src='/꼬들꼬들마스코트.png' width="50" height="48" alt="꼬들꼬들" />
                </a>
                <div className="col-6 text-end">
                    {
                    !session?
                    <SignInBtn />:
                    <SignOutBtn />
                    }
                </div>
                </div>
            </div>
            <hr className="mt-0" />
        </>
    )
}