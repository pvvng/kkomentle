'use client'

import { SimilarityType } from "@/util/functions/rankSimilarity";
import { JsonSimilarityType, useHandleLocalstorage } from "@/util/hooks/useHandleLocalstorage";
import { useEffect, useState } from "react";
import TableListContainer from "./TableListContainer";

export default function TableContainer({result} : {result : SimilarityType | null}){
    
    let [nowInputData, setNowInputData] = useState<JsonSimilarityType|null>(null);
    const storedGuessesArr = useHandleLocalstorage(result);

    useEffect(() => {
        storedGuessesArr?.map(sga => {
            if(result?.query === sga.query){
                setNowInputData({...sga})
            }
        })
    } ,[storedGuessesArr])

    return(
        <table className="w-100 mt-4">
            <tbody>
                <tr>
                    <th>#</th>
                    <th>추측한 단어</th>
                    <th>유사도</th>
                    <th>유사도 순위</th>
                </tr>
                {/* 사용자가 현재 입력한 값 */}
                {
                    nowInputData?
                    <tr>
                        <th style={{fontWeight: 400}}>{nowInputData.index}</th>
                        <th style={{color: '#f7617a', fontWeight: 600}}>{nowInputData.query}</th>
                        <th style={{fontWeight: 400}}>{nowInputData.similarity}</th>
                        <th style={{fontWeight: 400}}>{nowInputData.rank}</th>
                    </tr>
                    :null
                }

                {/* 수평선 */}
                <tr>
                    <td colSpan={4}>
                        <hr/>
                    </td>
                </tr>

                {/* 사용자가 이전에 입력한 값 (map) / 유사도 높은 순대로 */}  
                <TableListContainer storedGuessesArr={storedGuessesArr} result={result} />

            </tbody>
        </table>
    )
}