'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGuessesLocalstorage, usePlayTimeLocalstorage, useSettingState, useWinStateLocalstorage } from "../store";
import { TodayIndexType } from "../page";

const test = `안녕
${''}
인간들아
${'덤벼라'}
`

export default function ClearBoxContainer(props :TodayIndexType){

    let [indexGuesses, setIndexGuesses] = useState(0);
    const { guesses } = useGuessesLocalstorage();
    const { winState } = useWinStateLocalstorage();
    const { setting } = useSettingState();
    const { playtime } = usePlayTimeLocalstorage();

    console.log(setting);
    // 몫을 시간으로 사용
    const hours = Math.floor((playtime || 1) / 60); 
    // 나머지를 분으로 사용
    const minutes = (playtime || 1) % 60; 

    
    useEffect(() => {
        guesses?.map(psg => {
            if(psg.rank === 0){
                setIndexGuesses(psg.index);
            }
        });
    },[guesses])

    return(
        <div className="p-3 mt-3" style={{border: '1px solid', background : '#eeeeff'}}>
            {
                winState?
                <strong className="mb-2">정답 단어를 맞혔습니다. {indexGuesses}번째 추측만에 정답을 맞혔네요!</strong>:
                <strong>{indexGuesses}번째 추측에서 포기했습니다!</strong>
            }
            <p className="m-0 mt-2">오늘의 정답은 <strong>{props.word}</strong>였습니다.</p>
            <p className="m-0">정답 단어와 비슷한, <Link href="today-word">상위 1,000개의 단어</Link>를 확인해보세요.</p>
            <button 
                className="border-1 rounded-1 pt-1 pb-1 mt-2 mb-2" 
                onClick={() => {copyToClipboard(test)}}
            >기록 복사하기</button>
            <p className="m-0 mt-3 mb-3">{props.index + 1}번째 꼬들꼬들은 오늘 밤 자정(한국 시간 기준)에 열립니다.</p>
            <div className="fw-bold">
                <p className="m-0 mb-1 fst-italic">나의 플레이 기록</p>
                {
                    winState?
                    <>
                        <p className="m-0">정답을 푸는데 {hours}시간 {minutes}분이 걸렸어요.</p>
                        <p className="m-0">정답을 풀기까지 {indexGuesses}번 시도했어요.</p>
                    </>:
                    null
                }
            </div>
        </div>
    )
}

const copyToClipboard = async (textToCopy :string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('클립보드에 복사했습니다.');
    } catch (error) {
      console.error('복사에 실패했습니다.', error);
    }
};