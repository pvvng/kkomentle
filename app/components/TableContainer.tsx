'use client'

import { SimilarityType } from "@/util/functions/rankSimilarity";
import { useHandleLocalstorage } from "@/util/hooks/useHandleLocalstorage";
import TableListContainer from "./TableListContainer";

export default function TableContainer({result} : {result : SimilarityType | null}){

    let { storedGuessesArr, nowInputData } = useHandleLocalstorage(result);
    // now input이 guesses 에 포함될 경우 filter하기
    let filteredStoredGuessesArr = storedGuessesArr?.filter(items => items.query !== nowInputData?.query);

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
                    <TableListContainer tableData={nowInputData} type="input" />
                    :null
                }

                {/* 수평선 */}
                <tr>
                    <td colSpan={4}>
                        <hr/>
                    </td>
                </tr>

                {/* 사용자가 이전에 입력한 값 (map) / 유사도 높은 순대로 */}  
                {
                    filteredStoredGuessesArr?.map((fsga, i) => 
                        <TableListContainer key={i} tableData={fsga} type="list" />
                    )
                }
            </tbody>
        </table>
    )
}