import { useEffect, useState } from "react";
import { SimilarityType } from "../functions/rankSimilarity";
import { useGuessesLocalstorage, usePlayTimeLocalstorage, useTodayDateLocalstorage, useWinStateLocalstorage } from '@/app/store'
import moment from "moment";

// localstorage에 저장하는 추측 값 어레이의 타입
export interface JsonSimilarityType extends SimilarityType {
    index : number;
}

/** localstorage에 기본 값을 세팅하거나, 사용자가 입력한 값을 넣는 커스텀 훅*/
export function useHandleLocalstorage(result : SimilarityType | null){
    
    const { winState ,setWinState, loadWinState } = useWinStateLocalstorage();
    const { guesses, setGuessesState, loadGuessesState } = useGuessesLocalstorage();
    const { today, setTodayDateState, loadTodayDateState } = useTodayDateLocalstorage();
    const { playtime, setPlayTimeState, loadPlayTimeState } = usePlayTimeLocalstorage();

    const nowDate = new Date();
    const nowTime = (nowDate.getHours() * 60) + nowDate.getMinutes();

    let [nowInputData, setNowInputData] = useState<JsonSimilarityType|null>(null);

    /** 정답을 맞췄을 때 playtime을 얻는 함수 */
    function getPlayTime(
        guessedWord :SimilarityType, 
        guesses :JsonSimilarityType[] | null,
    ){
        let endTime = guessedWord.time || 0;
    
        let startTime = guesses?.filter(item => item.index === 1)[0]?.time ?? 0;

        let playtime = endTime - startTime;

        setPlayTimeState(playtime);
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
        // 오늘 날짜 확인
        const now = moment().format('YYYY-MM-DD');
        // 날짜 변경시 초기화
        if(today && today !== now){
            setGuessesState([]);
            setTodayDateState(now);
            setWinState(-1);
            setPlayTimeState(0);
        }
    }, [today])

    useEffect(() => {
        // 기본 값 정의
        let guessedWord :SimilarityType = { query : 'undefiend' ,similarity : -1, rank : -1 };

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
                setWinState(1);
                getPlayTime(guessedWord, guesses);
            }

            if(guesses){
                // 이미 추측한 단어면 등록 x
                let exist = false;
                let parsedGuesses :JsonSimilarityType[] = guesses;
                parsedGuesses.map(pg => {
                    if (pg.query === guessedWord.query){
                        exist = true;
                    }
                    // 만약 어레이에 정답 객체가 있으면 winState 변경
                    if(pg.rank === 0){
                        setWinState(1);
                        getPlayTime(pg, guesses);
                    }
                })
                // 이전에 추측하지 않은 단어만 localstorage에 등록
                if(!exist){
                    parsedGuesses.push({...guessedWord, index : parsedGuesses.length + 1});
                }
                // 유사도 높은 순대로 정렬
                parsedGuesses = parsedGuesses.sort((a, b) => b.similarity - a.similarity);
                // store & localstorage에 등록
                setGuessesState(parsedGuesses);
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

