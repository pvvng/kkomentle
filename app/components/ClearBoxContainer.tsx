'use client'

import Link from "next/link";
import { useWinStateLocalstorage } from "../store";
import { TodayIndexType } from "../page";
import copyToClipboard from "@/util/functions/copyToClipboard";
import useGetClipBoardText from "@/util/hooks/useGetClipBoardText";



export default function ClearBoxContainer(props :TodayIndexType){

    const { winState } = useWinStateLocalstorage();

    const { WIN_TEXT, LOSE_TEXT, indexGuesses, hours, minutes } = useGetClipBoardText();
    
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
                onClick={() => {
                    if(winState === 0){
                        copyToClipboard(LOSE_TEXT);
                    }else{
                        copyToClipboard(WIN_TEXT);
                    }
                }}
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