'use client'

import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "./loading-container/LoadingSpinner";
import APP_URL from "../APP_URL";

/** 
 * 내일의 단어에 대한 유사도 순위 db에 업데이트 하는 컴포넌트 
 * 
 * 버튼을 클릭하여 실행.
 * */
export default function SaveSimilarWordsContainer(){
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
  
    const fetchSimilarWords = async () => {
        setLoading(true);
        try {
            // db 유사어 업데이트
            const saveSimilarWords = await axios.post(`${APP_URL}/api/word/similar`);
            setResponse(saveSimilarWords.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="w-100">
            {
                loading ? 
                <div style={{margin : 'auto'}}>
                    <h2 className="text-center">파일 업데이트 중..</h2>
                    <LoadingSpinner darkmode={{value : 'dark'}} />
                </div>:
                <button onClick={fetchSimilarWords}>Fetch Similar Words</button>

            }
            {/* API 응답 데이터를 표시 */}
            {
                response 
                && 
                <div>업데이트 완료!</div>
            }
        </div>
    )
}

