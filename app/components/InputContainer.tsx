'use client'

import useQueryAnswerChecker from "@/util/hooks/useQueryAnswerChecker";
import { useEffect, useState } from "react";
import TableContainer from "./TableContainer";
import { SimilarityType } from "@/util/functions/rankSimilarity";

export default function InputContainer(){

    const { inputRef, result, handleClick } = useQueryAnswerChecker({ initialResult: null });
    
    let [guessedWordState, setGuessedWordState] = useState<SimilarityType|null>(null)

    useEffect(() => {
        // 기본 값 정의
        let guessedWord :SimilarityType = { query : 'undefiend' ,similarity : -1,rank : -1 };

        let guesses = localStorage.getItem('guesses');
        let winState = localStorage.getItem('winState');

        if(!guesses){
            localStorage.setItem('guesses', '[]');
        }
        if(!winState){
            localStorage.setItem('winState', '-1');
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
        console.log(guessedWordState)
    },[guessedWordState])

    return(
        <div className="row w-100" style={{margin : 'auto'}}>
            <input 
                ref={inputRef}
                className="col-sm-10 col-9 border-1 rounded-start-1 p-2"
                autoCorrect="off"
                autoCapitalize="none"
                autoComplete="off"
                type="text"
                autoFocus
            />
            <button 
                className="col-sm-2 col-3 border-1 rounded-end-1 p-2 submit-btn"
                type="submit"
                onClick={(e) => { handleClick(e) }}
            >
                추측하기
            </button>
            <TableContainer />
        </div>
    )
}

