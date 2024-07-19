'use client'

import { useWinStateLocalstorage } from "../store"

export default function GaveUpButtonContainer({darkmode} : {darkmode : {[key :string] :string}}){


    const { setWinState } = useWinStateLocalstorage();

    return(
        <div className="w-100 row" style={{margin : 'auto', marginTop : '60px', height : '40px'}}>
            <div className="col-3 p-0 text-center">
                <button 
                    className={
                        darkmode.value === 'dark'? 
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100 dark-mode-input-and-btn":
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100"
                    } 
                    onClick={() => {
                        const isGave = confirm('정말로 포기하시겠습니까?');
                        if(isGave){
                            setWinState(0);
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