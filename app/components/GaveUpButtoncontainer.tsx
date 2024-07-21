'use client'

import { useState } from "react";
import { useGuessesLocalstorage, useWinStateLocalstorage } from "../store"
import axios from "axios";

export default function GaveUpButtonContainer({darkmode} : {darkmode : {[key :string] :string}}){

    const { winState, setWinState } = useWinStateLocalstorage();
    const { guesses, setGuessesState } = useGuessesLocalstorage();

    // 만약 포기 버튼 누르면 오늘의 정답을 guesses localstorage에 추가하는 함수
    async function appendTodayAnswer(){
        const nowDate = new Date();
        const nowTime = (nowDate.getHours() * 60) + nowDate.getMinutes();
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
                        darkmode.value === 'dark'? 
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