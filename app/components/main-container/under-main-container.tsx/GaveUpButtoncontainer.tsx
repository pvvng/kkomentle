'use client'

import { useGuessesLocalstorage, useNowMode, useUserData } from "@/app/store";
import useAppendTodayAnswer from "@/util/hooks/useAppendTodayAnswer";
import axios from "axios";
import { ObjectId } from "mongodb";

export default function GaveUpButtonContainer(){

    const { nowMode } = useNowMode();
    const { nowUserData } = useUserData();
    const  { guesses } = useGuessesLocalstorage();
    const appendTodayAnswer = useAppendTodayAnswer();

    // trycount 기본값 설정
    let guessesLength :number = 1;
    if(guesses){
        guessesLength = guesses.length + 1;
    }
    const handleGaveUp = async () => {
        const isGave = confirm('정말로 포기하시겠습니까?');
        if (isGave) {
            // 비동기 작업을 호출하되, 완료를 기다리지 않음
            appendTodayAnswer(0);
            if(nowUserData !== undefined){
                updateDBWinState(nowUserData._id, 0, guessesLength).catch(error => {
                    console.error('Error updating win state:', error);
                });
            }
        }
    };

    return(
        <div className="w-100 row" style={{margin : 'auto', marginTop : '60px', height : '40px'}}>
            <div className="col-3 p-0 text-center">
                <button 
                    className={
                        nowMode.mode === 'dark'? 
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100 dark-mode-input-and-btn":
                        "rounded-1 border-1 pt-1 pb-1 w-100 h-100"
                    } 
                    onClick={handleGaveUp}
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

const updateDBWinState = async (
    userID :ObjectId | undefined, 
    winstate :number, 
    tryCount :number
) => {
    try {
        await axios.post('/api/post/winstate', {
            _id: userID,
            winstate: winstate,
            tryCount : tryCount
        });
        console.log('Win state updated successfully');
    } catch (error) {
        console.error('Error updating win state:', error);
    }
};