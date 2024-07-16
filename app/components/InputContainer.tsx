'use client'

import useQueryAnswerChecker from "@/util/hooks/useQueryAnswerChecker";
import TableContainer from "./TableContainer";
import ClearBoxContainer from "./ClearBoxContainer";

export default function InputContainer({todayIndex} : {todayIndex : number}){

    const { inputRef, result, handleClick, winState } = useQueryAnswerChecker({ initialResult: null });

    return(
        <div className="row w-100" style={{margin : 'auto'}}>
            <input 
                ref={inputRef}
                maxLength={5}
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
                onClick={ async (e) => { 
                    await handleClick(e);
                }}
            >
                추측하기
            </button>
            {
                winState !== -1?
                <ClearBoxContainer todayIndex = {todayIndex} />:
                null
            }
            <TableContainer result={result} />
        </div>
    )
}