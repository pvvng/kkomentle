'use client'

import useQueryAnswerChecker from "@/util/hooks/useQueryAnswerChecker";
import { useNowMode, useWinStateLocalstorage } from "../../../store";
import { TodayIndexType } from "../page-container/MainContainer";
import { lazy, Suspense } from "react";
import { SuspenseLoadingContainer } from "../../loading-container/LoadingSpinner";
import GaveUpButtonContainer from "./GaveUpButtoncontainer";
import TableContainer from "../table-container/TableContainer";

// Lazy load components
const ClearBoxContainer = lazy(() => import("../../hidden-container/ClearBoxContainer"));

export default function InputContainer(props :TodayIndexType){

    const { inputRef, result, handleClick } = useQueryAnswerChecker({ initialResult: null });
    const { winState } = useWinStateLocalstorage();
    const { nowMode } = useNowMode();

    const handleKeyPress = (e :React.KeyboardEvent<HTMLInputElement>) => {
        // Enter 키 누를 때 버튼 클릭과 동일한 동작을 함
        if (e.key === 'Enter') {
          handleClick();
        }
    };

    return(
        <div className="row w-100" style={{margin : 'auto'}}>
            <input 
                id="get-user-text"
                ref={inputRef}
                onKeyDown={(e) => handleKeyPress(e)}
                maxLength={5}
                className={
                    nowMode.mode === 'dark'? 
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
                    nowMode.mode === 'dark'? 
                    "col-sm-2 col-3 border-1 rounded-end-1 pt-1 pb-1 dark-mode-input-and-btn":
                    "col-sm-2 col-3 border-1 rounded-end-1 pt-1 pb-1"
                }
                onClick={ async () => { 
                    await handleClick();
                }}
            >
                추측하기
            </button>
            {/* <SuspenseLoadingContainer height = {350} /> */}

            {
                winState === null ? null :
                    winState !== -1 &&
                    <Suspense fallback={<SuspenseLoadingContainer height = {350} />}>
                        <ClearBoxContainer {...props} />
                    </Suspense>
            }
            <div style={{minHeight : '360px'}}>
                <TableContainer result={result} />
            </div>
            {
                winState === -1 &&
                <GaveUpButtonContainer tenQuery={props.tenQuery} />
            }
        </div>
    )
}