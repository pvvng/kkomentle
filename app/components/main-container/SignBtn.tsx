'use client'

import { signIn, signOut } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const kakaoLoginImage = "/kakao_login.png"

const BTN_STYLE = {
    background: `url(${kakaoLoginImage}) no-repeat center center`,
    backgroundSize: 'contain',
    width: '200px', // 버튼의 너비를 이미지에 맞게 설정
    height: '50px', // 버튼의 높이를 이미지에 맞게 설정
    border: 'none',
    cursor: 'pointer',
}

// 카카오 로그인 버튼
export function KakaoSignInBtn (){
    // 메인 페이지로 리다이렉트
    const searchParams = useSearchParams();
    if(searchParams){
        const callbackUrl = searchParams.get('callbackUrl') || '';
        return (
            <button 
                onClick={() => signIn('kakao', { callbackUrl })} 
                style={BTN_STYLE}
            >
            </button>
        )
    }
}

// 로그인 페이지로 이동하는 버튼
export function SignInBtn (){
    return <button className="border-1 rounded-1 p-2 submit-btn" onClick={() => {
        signIn();
    }}>로그인</button>
}

// 로그 아웃 버튼
export function SignOutBtn (){
    return <button className="border-1 rounded-1 p-2 submit-btn" onClick={() => {
        signOut();
    }}>로그아웃</button>
}