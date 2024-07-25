import { useEffect, useState } from "react";
import { SimilarityType } from "../functions/rankSimilarity";
import { useGuessesLocalstorage, usePlayTimeLocalstorage, useTodayDateLocalstorage, useUserData, useWinStateLocalstorage } from '@/app/store'
import moment from "moment-timezone";
import axios from "axios";
import useAppendTodayAnswer from "./useAppendTodayAnswer";

// localstorage에 저장하는 추측 값 어레이의 타입
export interface JsonSimilarityType extends SimilarityType {
    index ?: number;
}

/** localstorage에 기본 값을 세팅하거나, 사용자가 입력한 값을 넣는 커스텀 훅*/
export function useHandleLocalstorage(result : SimilarityType | null){

    // zustand store
    const { winState ,setWinState, loadWinState } = useWinStateLocalstorage();
    const { guesses, setGuessesState, loadGuessesState } = useGuessesLocalstorage();
    const { today, setTodayDateState, loadTodayDateState } = useTodayDateLocalstorage();
    const { playtime, setPlayTimeState, loadPlayTimeState } = usePlayTimeLocalstorage();
    const { nowUserData } = useUserData();

    // 특수 상황일때, 정답을 localstoreage guesses에 추가하기 위한 커스텀 훅
    // 특수 상황 : 사용자의 db에 저장된 isWin이 1일 경우 
    // 다른 디바이스에서 이미 정답을 맞혔을 경우 이미 정답을 안 상태이기 때문에 이를 막기 위해서 사용한다 
    const appendTodayAnswer = useAppendTodayAnswer();

    // 사용자 디바이스의 시간을 한국시로 포맷하기
    // 현재 시간 암호화
    const userNowDate = new Date();
    const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
    const nowTime = (koreanNowDate.hours() * 60) + koreanNowDate.minutes();

    // 현재 사용자가 입력한 값의 데이터
    let [nowInputData, setNowInputData] = useState<JsonSimilarityType|null>(null);

    /** 정답을 맞췄을 때 playtime을 얻는 함수 */
    async function getPlayTime(
        /** 새롭게 등록되는 추측 단어 객체 */
        guessedWord :JsonSimilarityType, 
        /** 기존 localhost에 등록된 추측 단어 객체 어레이 */
        guesses :JsonSimilarityType[] | null,
    ){
        let endTime = guessedWord.time || 0;

        // 만약 guesses의 length 가 0일 경우에는 starttime이 undfiend가 되어 0이 될것이다.
        // 이를 방지하기 위해 startTime이 undefiend 일 경우 endtime과 동일하게 만들어버린다.
        let startTime = guesses?.filter(item => item.index === 1)[0]?.time || endTime;

        let playtime = endTime - startTime;

        // playtime store에 playtime 계산한 업데이트
        setPlayTimeState(playtime);

        let guessesLength = guesses?.length || 0;
        let formattedDate = koreanNowDate.format('YYYY-MM-DD');

        if(guessedWord !== undefined && guessesLength >= 0){
            const putter = {
                guessedWord : guessedWord.query,
                date : formattedDate,
                playtime : playtime,
                try : guessesLength + 1,
                isLogin : 
                nowUserData === undefined ? undefined : nowUserData.email
            }
            // db에 클리어 정보 업데이트
            let postPlayTime = await axios.post('/api/post/tryCount', putter);
        }  
    }

    useEffect(() => {
        if(!guesses){
            loadGuessesState();
        }
        if(!winState){
            loadWinState();
        }
        if(!today){
            loadTodayDateState();
        }
        if(!playtime){
            loadPlayTimeState();
        }
    }, []);

    useEffect(() => {
        // 한국시로 현재 시간 포맷
        const now = koreanNowDate.format('YYYY-MM-DD');
        // 날짜 변경시 초기화
        if(today && today !== now){
            setGuessesState([]);
            setTodayDateState(now);
            setWinState(-1);
            setPlayTimeState(0);
        }
    }, [today])

    useEffect(() => {
        // 사용자가 로그인 한 상태 & 사용자의 db에 저장된 winstate가 1일 경우 
        // store winstate 1로 변경 & 오늘의 정답 추가하기
        if(nowUserData?.isWin === 1){
            if(winState !== 1){
                appendTodayAnswer(1);
            }
        }
        // 사용자가 로그인 한 상태 & 사용자의 db에 저장된 winstate가 0일 경우 
        // store winstate 0으로 변경 & 오늘의 정답 추가하기
        if(nowUserData?.isWin === 0){
            if(winState !== 1){
                appendTodayAnswer(0);
            }
        }
    },[winState])

    useEffect(() => {
        // 기본 값 정의
        let guessedWord :SimilarityType = { query : 'undefiend', similarity : -1, rank : -1 };

        if(result){
            result.rank === undefined
            // 유사어 순위에 포함되지 않은 단어를 입력했을때
            ?guessedWord = { 
                ...result, 
                time : nowTime,
                similarity: parseFloat(((result.similarity) * 100).toFixed(2)), 
                rank : '???',
            }
            // 유사도 순위에 포함된 단어를 입력했을때,
            :guessedWord = { 
                ...result, 
                time : nowTime,
                similarity: parseFloat(((result.similarity) * 100).toFixed(2)),
                rank: (result.rank === undefined || typeof result.rank === 'string') 
                ? '???'
                : (result.rank >= 1000 ? '1000위 이하' : result.rank),
            };
        }

        if(guessedWord.query !== undefined && guessedWord.rank !== -1){
            // 추측한 단어가 정답일 때 winState 변경 
            if(guessedWord.rank === 0){
                if(winState === -1){
                    setWinState(1);
                    getPlayTime(guessedWord, guesses);
                }
            }

            if(guesses){
                // 이미 추측한 단어면 등록 x
                let exist = false;
                let sortedGuesses :JsonSimilarityType[] = guesses;
                sortedGuesses.map(pg => {
                    if (pg.query === guessedWord.query){
                        exist = true;
                    }
                    // 만약 어레이에 정답 객체가 있으면 winState 변경
                    if(pg.rank === 0){
                        if(winState === -1){
                            setWinState(1);
                            getPlayTime(pg, guesses);
                        }
                    }
                })
                // 이전에 추측하지 않은 단어만 localstorage에 등록
                if(!exist){
                    sortedGuesses.push({...guessedWord, index : sortedGuesses.length + 1});
                }
                // 유사도 높은 순대로 정렬
                sortedGuesses = sortedGuesses.sort((a, b) => b.similarity - a.similarity);
                // store & localstorage에 등록
                setGuessesState(sortedGuesses);
            }
        }

        // 현재 input에 입력한 값 밖으로 빼기
        guesses?.map(sga => {
            if(result?.query === sga.query){
                setNowInputData({...sga});
            }
        })
    },[result]);

    return { nowInputData }; 
}

