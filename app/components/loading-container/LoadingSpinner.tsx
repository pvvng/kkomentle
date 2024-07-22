'use client'

import { useNowMode } from "@/app/store"

export default function LoadingSpinner(){

    const { nowMode } = useNowMode();

    return(
        <>
            <div className="mt-3" style={{margin : 'auto'}}>
                <div 
                    className="lava-lamp" 
                    style={{ background : nowMode.mode === 'dark' ? '#111111' : 'white'}}
                >
                    <div className="bubble"></div>
                    <div className="bubble1"></div>
                    <div className="bubble2"></div>
                    <div className="bubble3"></div>
                </div>
            </div>
            <p 
                className="text-center mt-3"
                style={{ color : nowMode.mode === 'dark' ? 'white' : 'dark' }}
            >로딩 중 입니다.</p>
        </>
    )
}