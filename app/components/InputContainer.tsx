'use client'

import useQueryAnswerChecker from "@/util/hooks/useQueryAnswerChecker";
import TableContainer from "./TableContainer";
import { useState } from "react";

export default function InputContainer(){

    const { inputRef, result, handleClick } = useQueryAnswerChecker({ initialResult: null });

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
            <TableContainer result={result} />
        </div>
    )
}