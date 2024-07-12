'use client'

import { SimilarityType } from "@/util/functions/rankSimilarity";
import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";

interface PropsType {
    storedGuessesArr: JsonSimilarityType[] | null, 
    result : SimilarityType | null
}

// localstorage에서 뽑아온 데이터의 key
const objKeyArr: (keyof JsonSimilarityType)[] = [
    "index",
    "query",
    "similarity",
    "rank",
]

export default function TableListContainer({storedGuessesArr, result} :PropsType){
    return(
        storedGuessesArr?.map(sga => 
            <tr key={sga.index}>
                {
                    objKeyArr.map((oka) => {
                        if (result?.query === sga.query){
                            return null;
                        }
                        return(<th key={oka} style={{fontWeight: 400}}>{sga[oka]}</th>)
                    })
                }
            </tr>
        )
    )
}