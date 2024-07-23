'use client'

import rankSimilarity, { SimilarityType } from "@/util/functions/rankSimilarity";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading-container/LoadingSpinner";
import { useEffect } from "react";
import { useNowMode, useSettingState } from "@/app/store";
import { useRouter } from "next/navigation";

export default function GetSimilarlityContainer({darkmode} : {darkmode : {[key :string] :string}}){

    const { setSettingState }  = useSettingState();
    const { setNowMode } = useNowMode();
    const router = useRouter();

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

    // react-query를 이용해서 db에 있는 rankSimilarity 데이터를 불러오고 이를 캐싱함
    // 이를 통해 매번 input 값을 입력할 때마다 새롭게 rankSimilarity 데이터를 불러오는 것을 해소함
    // 결과적으로 db 비용 절약 및 속도 개선에 이점을 얻을 수 있음
    const { data :rankSimilarityArr, isLoading, isError } = useQuery<SimilarityType[], Error>({
        queryKey : ['rankSimilarity'],
        queryFn : rankSimilarity,
        gcTime : 1000 * 60 * 60 * 24, // 1일
        staleTime : 1000 * 60 * 60, // 1시간
    })

    if(rankSimilarityArr === undefined || isLoading){
        return <LoadingSpinner />
    }

    if(isError) return <h1 className="text-center">에러가 발생했습니다.</h1>

    const filterdArr = rankSimilarityArr.filter(
        item => typeof item?.rank === 'number' && item?.rank <= 1000
    );
    return(
        <div className="p-2">
            <p className="text-center">
                <Link href='/'>메인 화면으로 돌아가기</Link>
            </p>
            <table style={{margin : 'auto'}}>
                <tbody>
                    <tr className="text-center w-100">
                        <th className="col-4">유사도 순위</th>
                        <th className="col-4">단어</th>
                        <th className="col-4">유사도</th>
                    </tr>
                    {
                        filterdArr.map((tsa, i) => {
                            return (
                                <tr key={tsa.rank}>
                                    <td>{i}</td>
                                    <td className="text-center">{tsa.query}</td>
                                    <td className="text-center">{(tsa.similarity * 100).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}