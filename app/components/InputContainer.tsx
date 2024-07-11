'use client'

import axios from "axios"
import { useRef } from "react";

export default function InputContainer(){

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // 기본 동작 방지
        event.preventDefault(); 
    
        if (inputRef.current !== null) {
            try {
                let res = await axios(`/api/get/checkAnswer?answer=${inputRef.current.value}`);
                console.log(res.data);
                // 입력 값 초기화
                inputRef.current.value = '';
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    
    return(
        <>
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
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                추측하기
            </button>
            </div>
        </>
    )
}

