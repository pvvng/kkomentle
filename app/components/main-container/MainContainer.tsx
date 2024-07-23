'use client'

import axios from "axios";
import InputContainer from "./InputContainer"
import getOneTenAndKSimilarlity from "@/util/functions/getOneTenAndK";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loading-container/LoadingSpinner";
import { useEffect } from "react";
import { useNowMode, useSettingState } from "@/app/store";
import { useRouter } from "next/navigation";

export interface TodayIndexType {
    word : string;
    yesterday : string;
    tomarrow : string;
    index : number;
    darkmode : {[key :string] :string};
    userdata : {[key :string] :string};
}

interface PropsType {
    darkmode : {[key :string] :string};
    userdata : {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }|undefined;
}

export default function MainContainer({darkmode, userdata} : PropsType){

    const router = useRouter();
    const { setNowMode } = useNowMode();
    const { setSettingState }  = useSettingState();
    
    useEffect(() => {
        // cookie로 다크모드 여부를 확인하지 못했을 때
        if(darkmode === undefined){
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
            router.refresh();

        }
        if(darkmode !== undefined){
            const cookieMode = darkmode.value;
            setNowMode({ mode: cookieMode });
            if(cookieMode === 'dark'){
                setSettingState({ darkmode : true });
            }else{
                setSettingState({ darkmode : false });
            }
        }
    },[darkmode])

    async function fetchMainContentData(){
        // 오늘의 단어 선별하는 API
        let selectTodayAnswer = await axios('/api/word/answer');  
        
        // 유사어 중에서 1, 10, 1000번째 순서를 가진 단어 불러오기
        let oneTenAndKSimilarityArr = await getOneTenAndKSimilarlity();
        // 정답과 오늘이 기준 날짜로부터 몇번째 정답인지 담긴 객체 + 다크모드 여부
        let todayIndex :TodayIndexType = {...selectTodayAnswer.data, darkmode : darkmode, userdata : userdata};
        return { oneTenAndKSimilarityArr, todayIndex }
    }

    const {data, isLoading, isError} = useQuery({
        queryKey : ['content'],
        queryFn : fetchMainContentData
    })

    const {oneTenAndKSimilarityArr, todayIndex} = {...data};

    // if(isLoading) return <LoadingSpinner darkmode={darkmode} />

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
                정답 단어와 가장 유사한 단어의 유사도는{' '} 
                <b>
                    {
                        oneTenAndKSimilarityArr !== undefined?
                        oneTenAndKSimilarityArr[0].similarity:
                        '???'
                    }
                </b>
                {' '}입니다. 
                10번째로 유사한 단어의 유사도는 
                {
                    oneTenAndKSimilarityArr !== undefined?
                    oneTenAndKSimilarityArr[1].similarity:
                    '???'
                }
                이고, 
                1,000번째로 유사한 단어의 유사도는
                {
                    oneTenAndKSimilarityArr !== undefined?
                    oneTenAndKSimilarityArr[2].similarity:
                    '???'
                } 
                {' '}입니다.
            </p>
            {
                todayIndex !== undefined ?
                <InputContainer {...todayIndex} />:
                <LoadingSpinner/>
            }
        </>

    )
}