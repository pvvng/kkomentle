'use client'

import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClearBoxContainer({todayIndex} : {todayIndex : number}){

    let [indexGuesses, setIndexGuesses] = useState(-1);
    let storedGuesses = localStorage.getItem('guesses');

    useEffect(() => {
        let parsedStoredGuesses :JsonSimilarityType[] = [];
        if(storedGuesses){
            parsedStoredGuesses = JSON.parse(storedGuesses);
        }
        // localstorage에서 값을 받아올때, input에 입력하는 값이 즉각적으로 반영되지 않는 문제가 존재한다.
        // 이 문제를 해결하기 위해, 받아온 guesses 어레이 안에 rank = 0인 데이터 (정답인 데이터)가 존재할 때와 아닐때를 구분한다.
        let exist = false;
        parsedStoredGuesses.map(psg => {
            if(psg.rank === 0){
                exist = true;
                setIndexGuesses(psg.index);
            }
        });

        // 맵핑했을때 존재하지 않을때만 index를 전체 어레이의 길어로 변경하기
        if(!exist){
            setIndexGuesses(parsedStoredGuesses.length);
        }
    },[storedGuesses])

    return(
        <div className="p-3 mt-3" style={{border: '1px solid', background : '#eeeeff'}}>
            <b>정답 단어를 맞혔습니다. {indexGuesses}번째 추측만에 정답을 맞혔네요!</b>
            <br/>
            <span>정답 단어와 비슷한, <Link href="">상위 1,000개의 단어</Link>를 확인해보세요.</span>
            <br/>
            <button className="border-1 rounded-1 pt-1 pb-1 mt-2 mb-2">기록 복사하기</button>
            <br/>
            <span>{todayIndex + 1}번째 꼬들꼬들은 오늘 밤 자정(한국 시간 기준)에 열립니다.</span>
        </div>
    )
}