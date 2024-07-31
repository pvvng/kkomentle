'use client'

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoShare() {
    
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY); // 환경 변수 사용
        }
    }, []);

    return (
        <>
            <div className='float-end mt-2 mb-2'>
                <Script
                    src="https://developers.kakao.com/sdk/js/kakao.js"
                    strategy="afterInteractive"
                    onLoad={() => {
                        if (window.Kakao && !window.Kakao.isInitialized()) {
                            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY); // 환경 변수 사용
                        }
                    }}
                />
                <span className="w-100 speech-bubble mx-2">
                    친구에게 꼬들꼬들 알려주기
                </span>
                <button 
                    className='kakao-btn'
                    style={{
                        height : 'auto', 
                        border : 'none', 
                        background : 'none',
                    }}
                    onClick={() => shareToKakao()}
                >
                    <img src='/kakao_share.png' width="100%" height="auto" alt='share-button' />
                </button>
            </div>          
            <div style={{clear : 'both'}}></div>
        </>
    );
}

const shareToKakao = () => {
    if (window.Kakao) {
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '꼬들꼬들 - 단어 유사도 추측 게임',
                description: '오늘의 정답은 뭘까요?',
                imageUrl: `https://kkodle-kkodle.netlify.app/badge-image/%EA%B8%B0%EB%B3%B8%EA%BC%AC%EB%93%A4%EA%BC%AC%EB%93%A4.png`,
                link: {
                    mobileWebUrl: 'https://kkodle-kkodle.netlify.app/',  // 모바일 웹 링크
                    webUrl: 'https://kkodle-kkodle.netlify.app/',  // 웹 링크
                },
            },
            buttons: [
                {
                    title: '한번 해보기',  
                    link: {
                        mobileWebUrl: 'https://kkodle-kkodle.netlify.app/',
                        webUrl: 'https://kkodle-kkodle.netlify.app/',
                    },
                },
            ],
        });
    }
};