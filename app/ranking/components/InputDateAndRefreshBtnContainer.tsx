'use client';


import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PropsType {
    inputValueState : string|null;
    setInputValueState : Dispatch<SetStateAction<string | null>>;
    formattedTodayDate : string;
    darkmode: {[key: string]: string;}

}

/** input type date 의 value를 변경해 날짜에 맞는 데이터를 불러오는 input / refresh button을 렌더링하는 컴포넌트 */
export default function InputDateAndRefreshBtnContainer({inputValueState, setInputValueState, formattedTodayDate, darkmode} :PropsType){
    const router = useRouter();

    return(
        <>
            <div className="float-end">
                {/* input type date */}
                <input 
                    type="date" 
                    date-placeholder="날짜를 선택하세요"
                    required
                    aria-required="true"
                    min={'2024-07-11'}
                    max={formattedTodayDate}
                    value={inputValueState || formattedTodayDate}
                    className={
                        darkmode.value === 'dark'? 
                        "border-1 rounded-1 p-1 mx-2 dark-mode-input-and-btn":
                        "border-1 rounded-1 p-1 mx-2"
                    }
                    onChange={
                        (e :ChangeEvent<HTMLInputElement>) => setInputValueState(e.target.value)
                    } 
                />     
                {/* react query 종속성 변경해서 data refetch 하는 버튼 */}
                <button 
                    className={
                        darkmode.value === 'dark'? 
                        "refresh-btn border-1 rounded-1 pt-1 pb-1 dark-mode-input-and-btn":
                        "refresh-btn border-1 rounded-1 pt-1 pb-1"
                    }
                    onClick={() => {router.refresh()}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                </button>           
            </div>

            <div style={{clear : 'both'}}></div>
        </>
    )
}