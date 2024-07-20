'use client'

import useQueryAnswerChecker from "@/util/hooks/useQueryAnswerChecker";
import TableContainer from "./TableContainer";
import ClearBoxContainer from "./ClearBoxContainer";
import GaveUpButtonContainer from "./GaveUpButtoncontainer";
import { useSettingState, useWinStateLocalstorage } from "../store";
import { TodayIndexType } from "../page";
import { useEffect } from "react";

export default function InputContainer(props :TodayIndexType){

    const { inputRef, result, handleClick } = useQueryAnswerChecker({ initialResult: null });
    const { winState } = useWinStateLocalstorage();
    const { setSettingState } = useSettingState();

    const handleKeyPress = (e :React.KeyboardEvent<HTMLInputElement>) => {
        // Enter 키 누를 때 버튼 클릭과 동일한 동작을 함
        if (e.key === 'Enter') {
          handleClick();
        }
    };

    if(props.darkmode === undefined){
        document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
    }
    
    useEffect(() => {

        if (props.darkmode !== undefined && props.darkmode.value === 'dark'){
            setSettingState({ darkmode : true });
        }
    },[])

    return(
        <div className="row w-100" style={{margin : 'auto'}}>
            <input 
                ref={inputRef}
                onKeyDown={(e) => handleKeyPress(e)}
                maxLength={5}
                className={
                    props.darkmode.value === 'dark'? 
                    "col-sm-10 col-9 border-1 rounded-start-1 p-2 dark-mode-input-and-btn":
                    "col-sm-10 col-9 border-1 rounded-start-1 p-2"
                }
                autoCorrect="off"
                autoCapitalize="none"
                autoComplete="off"
                type="text"
                autoFocus
                aria-label="userInput"
            />
            <button 
                className = {
                    props.darkmode.value === 'dark'? 
                    "col-sm-2 col-3 border-1 rounded-end-1 p-2 submit-btn dark-mode-input-and-btn":
                    "col-sm-2 col-3 border-1 rounded-end-1 p-2 submit-btn"
                }
                type="submit"
                onClick={ async () => { 
                    await handleClick();
                }}
            >
                추측하기
            </button>
            {
                winState === null?
                null:
                winState !== -1 &&
                <ClearBoxContainer {...props} darkmode = {props.darkmode} />
            }
            <TableContainer result={result} darkmode={props.darkmode} />
            {
                winState === -1 &&
                <GaveUpButtonContainer darkmode={props.darkmode} />
            }
        </div>
    )
}