'use client'

import axios from "axios"

export default function InputContainer(){
    return(
        <>
            <div className="row w-100" style={{margin : 'auto'}}>
            <input 
                className="col-10 border-1 rounded-start-1 p-2"
                name="answer" 
                autoCorrect="off"
                autoCapitalize="none"
                autoComplete="off"
                type="text"
                autoFocus
            />
            <button 
                className="col-2 border-1 rounded-end-1 p-2 submit-btn"
                type="submit"
                onClick={ async () => {
                    let res = await axios('/api/get/checkAnswer');
                    console.log(res.data);
                }}
            >
                추측하기
            </button>
            </div>
        </>
    )
}