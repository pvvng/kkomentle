'use client'

import { useRouter } from "next/navigation";
import { useAlertBoxState, useNowMode, useSettingState } from "../../store"
import { CSSProperties } from "react";

const INPUT_LABEL_ARRAY = [
    { id: 'darkmode', content : '다크모드' },
    { id: 'try', content : '결과 공유 텍스트에 추측 횟수 표시하기' },
    { id: 'time', content : '결과 공유 텍스트에 걸린 시간 표시하기' },
    { id: 'sim', content : '결과 공유 텍스트에 최대 유사도 표시하기' },
]

export default function SettingAlertContainer(){

    const { alert, setAlertState } = useAlertBoxState();
    const { setting, setSettingState } = useSettingState();
    const { nowMode } = useNowMode();
    const router = useRouter();

    return(
        <div 
            style={{ 
                ...BACKGROUND_STYLE, 
                visibility: alert % 2 === 0 ? 'hidden' : 'visible' 
            }} 
            onClick={(e) => {
                // 검은 배경 클릭하면 alert Box 닫기
                if (e.target === e.currentTarget) {
                    setAlertState();
                }
            }}
        >
            <div 
                className={nowMode.mode === 'dark' ? "w-100 rounded p-3 dark-mode-setting-box" : "w-100 rounded p-3 bg-white"}
                style={{maxWidth : '640px', margin : 'auto'}}
            >
                <div onClick={() => {
                    setAlertState();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-square setting-emogi float-end" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    <p className="setting-title">설정</p>
                </div>
                {INPUT_LABEL_ARRAY.map(ila => 
                        <div key={ila.id} className="input-label-wrapper">
                            <input id={ila.id} checked = {setting[ila.id]} type="checkbox" onChange={(e) => {
                                if(ila.id === 'darkmode'){
                                    e.target.checked?
                                    document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400):
                                    document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
                                }
                                setSettingState({ [ila.id] : e.target.checked  });
                                router.refresh();
                            }} />
                            <label htmlFor={ila.id} className="mx-2">{ila.content}</label>
                        </div>
                    )}
                <div style={{clear : 'both'}}></div>
            </div>
        </div>
    )
}

/** alert box background style */
const BACKGROUND_STYLE: CSSProperties = {
    width: '100vw',
    height: '100vh',
    zIndex: 10,
    background: 'rgba(0,0,0,0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '60px',
    overflow: 'hidden',
};