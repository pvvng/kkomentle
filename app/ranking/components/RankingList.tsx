'use client'

import axios from "axios";
import LoadingSpinner from "@/app/components/loading-container/LoadingSpinner";
import moment from 'moment-timezone';
import useSetModeCookie from "@/util/hooks/useSetModeCookie";
import { useQuery } from "@tanstack/react-query";
import { getImage } from '@/app/components/badge-container/getBadgeImageContainer';
import { useState } from "react";
import { UserDataType } from "@/util/functions/getServerUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

interface PropsType{
    darkmode : {[key :string] :string};
    userdata : UserDataType|undefined; 
}

interface TodayPlayData{
    _id : string;
    date : string;
    gussesWord : string;
    playtime : number;
    try : number;
    isLogin ?: string;
    image : string;
    name : string;
    totalScore : number;
}

export default function RankingListContainer({darkmode, userdata} : PropsType){

    let userEmail :string = '';
    if(userdata !== undefined){
        userEmail = userdata.email;
    }

    let [refetchState, setRefetchState] = useState(0);
    // 웹 라이트모드 / 다크모드 설정
    useSetModeCookie(darkmode);

    // 현재 한국 시간 기준 날짜
    const koreanNowDate = moment().tz("Asia/Seoul");
    const formattedTodayDate = moment(koreanNowDate).format('YYYY-MM-DD');
    
    const { data, isLoading, isError} = useQuery({
        queryKey : ['data', refetchState],
        queryFn : fetchTodayTryCount
    })

    if(data === undefined || isLoading) return <LoadingSpinner height={500} />
    if(isError) return <p className='text-center'>예상치 못한 에러가 발생했어요.</p>

    return(
        <>
            <h2 className='text-center'>{formattedTodayDate} 랭킹</h2>
            {/* react query 종속성 변경해서 data refetch 하는 버튼 */}
            <button 
                className={
                    darkmode.value === 'dark'? 
                    "float-end refresh-btn border-1 rounded-1 pt-1 pb-1 dark-mode-input-and-btn":
                    "float-end refresh-btn border-1 rounded-1 pt-1 pb-1"
                }
                onClick={() => {setRefetchState(pre => pre + 1)}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>
            <div style={{clear : 'both'}}></div>
            <hr/>
            {data.map((d, i) => 
                <div key={d._id + d.name + i} 
                    className="w-100 border rounded p-2 mt-2 row text-center" 
                    style={{
                        margin : 'auto', 
                        justifyContent : 'center', 
                        alignItems : 'center',
                        background : 
                        (i === 0 || i === 1 || i === 2) ? 
                        'linear-gradient(25deg, rgba(33,110,255,1) 0%, rgba(41,235,184,1) 49%, rgba(0,212,255,1) 100%)': 
                        'none',
                    }}
                >
                    <div className='col-4'>
                        <div>
                            <span className="fw-bold">
                                {
                                    (i === 0 || i === 1 || i === 2 )? 
                                    <FontAwesomeIcon icon={faCrown} />:
                                    <span>{i + 1}등</span>
                                }
                            </span>
                        </div>
                        <div style={{width : '70%', margin : 'auto'}}>
                            { getImage(d.image) }
                        </div>
                    </div>
                    <div className='col-5'>
                        <p className='fw-bold m-0 mb-1'>
                            <span>{d.name}</span>
                            {
                                userEmail === d.isLogin ? 
                                <span className="fw-bold">{' '}(나)</span>:
                                null
                            }
                        </p>
                        <p className='m-0'>게임 시간 : <strong>{d.playtime}</strong>분</p>
                        <p className='m-0'>시도 횟수 : <strong>{d.try}</strong>회</p>
                    </div>
                    <div className='col-3'>
                        <p className='m-0 fw-bold'>{d.totalScore}점</p>
                    </div>
                </div>
            )}
        </>
    )
}

export async function fetchTodayTryCount(){
    try {
      const result = await axios.get('/api/get/ranking');
      return result.data as TodayPlayData[];
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
}