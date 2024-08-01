'use client'

import { faArrowUpFromBracket, faDownload, faSquarePlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function InstallPWAAlertContainer() {
    // beforeinstallprompot 이벤트 객체 저장하는 상태
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    // 설치 prompt 보여주는 상태
    const [showInstallPrompt, setShowInstallPrompt] = useState<boolean>(false);
    // 이용자 디바이스가 IOS 일때 true
    const [isiOS, setIsiOS] = useState<boolean>(false);
    // IOS prompt 보여주는 상태
    const [showiOSPrompt, setShowiOSPrompt] = useState<boolean>(false);
    // 사용자가 더블클릭시 prompt 닫는 상태
    const [isOnDoubleClick, setIsOnDoubleClick] = useState<boolean>(false);

    useEffect(() => {
        // 이용자 디바이스
        const userAgent = window.navigator.userAgent.toLowerCase();
        // 이용자 디바이스가 ios인지 확인
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        // IOS 가 맞다면 IOS 감시 플래그 상태 true로 변경
        setIsiOS(isIOSDevice);

        // IOS 디바이스가 맞을때
        if (isIOSDevice) {
            // 웹앱이 standalone (독립실행형) 모드인지 확인
            // 웹앱이 standalone 모드일 경우엔 이미 설치된 웹앱으로 이해하고 설치 prompt를 보여주지 않는다.
            const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
            if (!isInStandaloneMode) {
                setShowiOSPrompt(true);
            }
        // IOS 디바이스가 아닐때
        } else {
            const handler = (e: Event) => {
                // 기본 이벤트 동작 정지
                // 여기서 기본 이벤트 동작은 브라우저가 자동으로 설치 prompt를 표시하는 것
                e.preventDefault();
                // 이벤트 객체 상태에 저장
                setDeferredPrompt(e as BeforeInstallPromptEvent);
                // 설치 prompt 표시 상태 변경
                setShowInstallPrompt(true);
            };
        
            // 이벤트 리스너 등록, 앞서 정의한 handler 함수를 호출
            window.addEventListener('beforeinstallprompt', handler as EventListener);

            // 이벤트 리스너 클린업
            return () => {
                window.removeEventListener('beforeinstallprompt', handler as EventListener);
            };
        }
    }, []);

    const handleInstallClick = async () => {
        // beforeinstallprompt 이벤트가 등록 되었을 경우
        if (deferredPrompt) {
            // prompt 표시
            deferredPrompt.prompt();
            // deferredPrompt.userChoice는 사용자의 선택 결과를 나타내는 Promise를 반환
            const { outcome } = await deferredPrompt.userChoice;
            // 설치 수락시
            if (outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            // 설치 거부시    
            } else {

                console.log('User dismissed the A2HS prompt');
            }

            // 설치 prompt 관련 상태 초기화
            setDeferredPrompt(null);
            setShowInstallPrompt(false);
        }
    };

    return (
        <div>
            {/* IOS 아닌 디바이스에 대한 install prompt */}
            {(showInstallPrompt && !isOnDoubleClick) && (
                <div className="install-banner"
                    onDoubleClick={() => {
                        setIsOnDoubleClick(true);
                    }}
                >
                    <button onClick={handleInstallClick}>
                        지금 꼬들꼬들 다운하기{' '}
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                    <p className='m-0 mt-2 quit-text'>(더블 클릭해서 창 닫기)</p>
                </div>
            )}
            {/* IOS인 디바이스에 대한 install prompt */}
            {(showiOSPrompt && !isOnDoubleClick) && (
                <div className="ios-install-banner"
                    onDoubleClick={() => {
                        setIsOnDoubleClick(true);
                    }}
                >
                    <div className='m-0 col-12'>
                        <p className='m-1 fw-bold'>앱 다운로드를 원하시나요?</p>
                        <p className='m-0 ios-install-banner-explain'><FontAwesomeIcon icon={faArrowUpFromBracket} />{' '}<strong>공유 아이콘{' '}</strong>을 클릭하고,</p> 
                        <p className='m-0 ios-install-banner-explain'><FontAwesomeIcon icon={faSquarePlus} />{' '}<strong>홈화면에 추가{' '}</strong>를 클릭하세요!</p>
                        <p className='mt-2 quit-text'>(더블 클릭해서 창 닫기)</p>
                    </div>
                </div>
            )}
        </div>
    );
}

