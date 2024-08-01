'use client'

import { useNowMode } from "@/app/store"

export default function LoadingSpinner({height} : {height ?: (string | number)}){

    const { nowMode } = useNowMode();

    let boxHeight :string = '';

    if(height === undefined){
        boxHeight = 'none';
    }
    if(typeof height === 'number'){
        boxHeight = (height).toString() + 'px'; 
    }
    if (typeof height === 'string'){
        boxHeight = height;
    }

    return(
        <div className="w-100 row" style={{height: boxHeight}}>
            <div style={{margin : 'auto'}}>
                <div className="lava-lamp">
                    <div className="bubble"></div>
                    <div className="bubble1"></div>
                    <div className="bubble2"></div>
                    <div className="bubble3"></div>
                </div>
                <p className="text-center mt-3" style={{ 
                    color : nowMode.mode === 'dark' ? 'white' : 'black' 
                }}>로딩 중 입니다.</p>
            </div>
        </div>
    )
}

export function SuspenseLoadingContainer({height} : {height : (string | number)}){

    const { nowMode } = useNowMode();

    let boxHeight :string = '';
    if(typeof height === 'number'){
        boxHeight = (height).toString() + 'px'; 
    }else if (typeof height === 'string'){
        boxHeight = height;
    }

    return(
        <div className="w-100 row" style={{height : boxHeight}}>
            <div className="text-center" style={{margin : 'auto'}}>
                <div className={
                    nowMode.mode === 'dark' ? 
                    "spinner-grow text-light mt-3":
                    "spinner-grow text-dark mt-3"
                } role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p
                    className="text-center mt-3"
                    style={{ color : nowMode.mode === 'dark' ? 'white' : 'black' }}
                >페이지 불러오는 중</p>
            </div>
        </div>
    )
}