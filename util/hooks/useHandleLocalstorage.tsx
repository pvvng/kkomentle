import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SimilarityType } from "../functions/rankSimilarity";
import moment from "moment";

// localstorage에 저장하는 추측 값 어레이의 타입
export interface JsonSimilarityType extends SimilarityType {
    index : number;
}

/** localstorage에 기본 값을 세팅하거나, 사용자가 입력한 값을 넣는 커스텀 훅
 * 
 * return => localstorage에 저장되는 사용자 입력 값을 담은 어레이
  */
export function useHandleLocalstorage(result : SimilarityType | null){

    const now = moment().format('YYYY-MM-DD');

    let [guessedWordState, setGuessedWordState] = useState<SimilarityType|null>(null);
    let [storedGuessesArr, setStoredGuessesArr] = useState<JsonSimilarityType[]|null>(null);

    useEffect(() => {
        const guesses = localStorage.getItem('guesses');
        if (!guesses) {
            localStorage.setItem('guesses', '[]');
        } else {
            const parsedGuesses: JsonSimilarityType[] = JSON.parse(guesses);
            setStoredGuessesArr(parsedGuesses);
        }
    }, []);

    useEffect(() => {
        // 기본 값 정의
        let guessedWord :SimilarityType = { query : 'undefiend' ,similarity : -1,rank : -1 };

        let guesses = localStorage.getItem('guesses');
        let winState = localStorage.getItem('winState');
        let today = localStorage.getItem('today');

        if(!guesses){
            localStorage.setItem('guesses', '[]');
        }
        if(!winState){
            localStorage.setItem('winState', '-1');
        }
        if(!today){
            localStorage.setItem('today', now);
        }
        if(today !== now){
            localStorage.setItem('today', now);
            localStorage.setItem('guesses', '[]');
        }
        if(result){
            result.rank === undefined
            // 유사어 순위에 포함되지 않은 단어를 입력했을때
            ?guessedWord = { 
                ...result, 
                similarity: parseFloat(((result.similarity) * 100).toFixed(2)), 
                rank : '???'
            }
            // 유사도 순위에 포함된 단어를 입력했을때,
            :guessedWord = { 
                ...result, 
                similarity: parseFloat(((result.similarity) * 100).toFixed(2)),
                rank: (result.rank === undefined || typeof result.rank === 'string') 
                ? '???'
                : (result.rank >= 1000 ? '1000위 이상' : result.rank)
            };
        }

        if(guessedWord.query !== undefined && guessedWord.rank !== -1){
            setGuessedWordState(guessedWord);
        }
    }, [result]);

    useEffect(()=>{
        if(guessedWordState){
            const guesses = localStorage.getItem('guesses');

            // 혹시 guesses 사라졌을가봐 추가
            if(!guesses){
                localStorage.setItem('guesses', '[]');
            }
            
            if(guesses){
                // 이미 추측한 단어면 등록 x
                let exist = false;
                let parsedGuesses :JsonSimilarityType[] = JSON.parse(guesses);
                parsedGuesses.map(pg => {
                    if (pg.query === guessedWordState.query){
                        exist = true;
                    }
                })
                // 이전에 추측하지 않은 단어만 localstorage에 등록
                if(!exist){
                    parsedGuesses.push({...guessedWordState, index : parsedGuesses.length + 1});
                }
                // 유사도 높은 순대로 정렬
                parsedGuesses = parsedGuesses.sort((a, b) => b.similarity - a.similarity);
                setStoredGuessesArr([...parsedGuesses]);
                const stringifiedGuesses = JSON.stringify(parsedGuesses);
                localStorage.setItem('guesses', stringifiedGuesses);
            }
        }
    },[guessedWordState]);

    return storedGuessesArr;
}