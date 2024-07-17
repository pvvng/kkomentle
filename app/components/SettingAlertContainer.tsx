'use client'

import { useAlertBoxState } from "../store"

export default function SettingAlertContainer(){

    const { alert, setAlertState } = useAlertBoxState();

    return(
        <div style={{
            width : '100vw', 
            height : '100vh', 
            zIndex : 10, 
            background:'rgba(0,0,0,0.5)', 
            position :'fixed',
            top: 0,
            left : 0,
            padding : '60px',
            overflow : 'hidden',
            visibility : alert % 2 === 0? 'hidden' :'visible',
        }}>
            <div className="w-100 rounded bg-white p-3">
                <div onClick={() => {
                    setAlertState();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-square setting-emogi float-end" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
                <div style={{clear : 'both'}}></div>
            </div>
        </div>
    )
}