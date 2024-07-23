'use client'

import moment from "moment-timezone";
import axios from "axios";
import { useGuessesLocalstorage, useNowMode, useWinStateLocalstorage } from "@/app/store";

export default function GaveUpButtonContainer(){

    const { nowMode } = useNowMode();
    const { winState, setWinState } = useWinStateLocalstorage();
    const { guesses, setGuessesState } = useGuessesLocalstorage();

    // 만약 포기 버튼 누르면 오늘의 정답을 guesses localstorage에 추가하는 함수
    async function appendTodayAnswer(){

        const userNowDate = new Date();
        const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
        const nowTime = (koreanNowDate.hours() * 60) + koreanNowDate.minutes();
        
        let selectTodayAnswer = await axios(`/api/word/answer`); 
        let todayWord :string = selectTodayAnswer.data.word;
        if(winState === -1 && guesses !== null){
            let temp = [...guesses];
            const tempTodayWord = {
                query : todayWord,
                similarity : 100,
                rank : 0,
                time : nowTime,
                index : guesses.length + 1,
            }
            temp.push(tempTodayWord);
            setGuessesState(temp);
        }
    }

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
                        if(isGave){
                            setWinState(0);
                            appendTodayAnswer();
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