'use client'

import { useNowMode, useWinStateLocalstorage } from "@/app/store";
import useAppendTodayAnswer from "@/util/hooks/useAppendTodayAnswer";

export default function GaveUpButtonContainer(){

    const { nowMode } = useNowMode();
    const appendTodayAnswer = useAppendTodayAnswer();

    return(
        <div className="w-100 row" style={{margin : 'auto', marginTop : '60px', height : '40px'}}>
            <div className="col-3 p-0 text-center">
                <button 
                    className={
                        nowMode.mode === 'dark'? 
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100 dark-mode-input-and-btn":
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100"
                    } 
                    onClick={() => {
                        const isGave = confirm('정말로 포기하시겠습니까?');
                        if(isGave){appendTodayAnswer(0);
                    }}}
                    >포기하기</button>
            </div>
            <a 
                href="https://newsjel.ly/archives/newsjelly-report/data-storytelling/14842?utm_source=semantle_ko&utm_medium=bottom_banner"
                target="_blank"
                className="col-9"
            >
                <div 
                    style={{
                        backgroundImage : 'url(/banner-image.png)', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition:'center center',
                        backgroundSize : 'cover',
                        height  : '100%'
                    }}
                >
                </div>
            </a>
        </div>
    )
}