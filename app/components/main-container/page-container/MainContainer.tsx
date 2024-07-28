'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserData } from "@/app/store";
import { UserDataType } from "@/util/functions/getServerUserData";
import InputContainer from "../under-main-container.tsx/InputContainer";
import LoadingSpinner from "../../loading-container/LoadingSpinner";
import fetchMainContentData from "@/util/functions/fetchMainContentData";
import useSetModeCookie from "@/util/hooks/useSetModeCookie";

export interface TodayIndexType {
    word : string;
    yesterday : string;
    tomarrow : string;
    index : number;
    darkmode : {[key :string] :string};
    tenQuery : string;
}

interface PropsType {
    darkmode : {[key :string] :string};
    userdata : UserDataType | undefined;
}

export default function MainContainer({darkmode, userdata} : PropsType){

    // userdata zustand store 저장
    const { setNowUserData } = useUserData();
    // 웹 라이트모드 / 다크모드 설정
    useSetModeCookie(darkmode);
    
    // 컴포넌트에 필요한 데이터 리액트 쿼리로 불러오기
    const {data, isError} = useQuery({
        queryKey : ['content'],
        queryFn : () => fetchMainContentData(darkmode)
    })

    const {oneTenAndKSimilarityArr, todayIndex} = {...data};

    // userdata store에 저장
    useEffect(() => {
        setNowUserData(userdata);
    },[userdata])

    if(isError) return <p className="text-center">에러가 발생했습니다. 잠시 후 시도해주세요.</p>
    
    return(
        <>
            <p className="m-0 mt-sm-4 mb-sm-4 mt-1 mb-3">
                {
                    todayIndex !== undefined?
                    todayIndex.index:
                    '???'
                }
                번째 꼬들꼬들의 정답 단어를 맞혀보세요.
                <br/>
                정답 단어와 가장 유사한 단어의 유사도는&nbsp;
                <b>
                    {
                        oneTenAndKSimilarityArr !== undefined?
                        oneTenAndKSimilarityArr[0].similarity:
                        '???'
                    }
                </b>
                &nbsp;입니다. 
                10번째로 유사한 단어의 유사도는&nbsp;
                {
                    oneTenAndKSimilarityArr !== undefined?
                    oneTenAndKSimilarityArr[1].similarity:
                    '???'
                }
                이고,&nbsp; 
                1,000번째로 유사한 단어의 유사도는&nbsp;
                {
                    oneTenAndKSimilarityArr !== undefined?
                    oneTenAndKSimilarityArr[2].similarity:
                    '???'
                } 
                &nbsp;입니다.
            </p>
            {
                todayIndex !== undefined ?
                <InputContainer {...todayIndex} />:
                <LoadingSpinner/>
            }
        </>

    )
}