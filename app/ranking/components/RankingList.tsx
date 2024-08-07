'use client'

import axios from "axios";
import LoadingSpinner from "@/app/components/loading-container/LoadingSpinner";
import moment from 'moment-timezone';
import useSetModeCookie from "@/util/hooks/useSetModeCookie";
import { useQuery } from "@tanstack/react-query";
import { getImage } from '@/app/components/badge-container/getBadgeImageContainer';
import { useEffect, useState } from "react";
import { UserDataType } from "@/util/functions/getServerUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import './calendar.css';
import InputDateAndRefreshBtnContainer from "./InputDateAndRefreshBtnContainer";

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
    isHintUsed : boolean;
    totalScore : number;
}

export default function RankingListContainer({darkmode, userdata} : PropsType){

    let userEmail :string = '';
    if(userdata !== undefined){
        userEmail = userdata.email;
    }

    // input value 저장하는 상태 && React-Query 종속성 상태
    let [inputValueState, setInputValueState] = useState<string|null>(null);
    // 웹 라이트모드 / 다크모드 설정
    useSetModeCookie(darkmode);

    // 현재 한국 시간 기준 날짜
    const koreanNowDate = moment().tz("Asia/Seoul");
    const formattedTodayDate = moment(koreanNowDate).format('YYYY-MM-DD');

    useEffect(() => {
        if(!inputValueState){
            setInputValueState(formattedTodayDate);
        }
    },[])
    
    const { data, isLoading, isError} = useQuery({
        queryKey : ['data', inputValueState],
        queryFn : () => fetchTodayTryCount(inputValueState||formattedTodayDate)
    })

    const props = {inputValueState, setInputValueState, formattedTodayDate, darkmode}

    if(data === undefined || isLoading) return <LoadingSpinner height={500} />
    if(isError) return <p className='text-center'>예상치 못한 에러가 발생했어요.</p>

    return(
        <>
            <h2 className='text-center'>{inputValueState} 랭킹</h2>
            <InputDateAndRefreshBtnContainer {...props} />
            <hr/>

            {/* rank map */}
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
                        <p className="m-0">
                            {
                                d.isHintUsed?
                                <strong>힌트 사용</strong> : 
                                <strong>힌트 미사용</strong>
                            }
                        </p>
                    </div>
                    <div className='col-3'>
                        <p className='m-0 fw-bold'>{d.totalScore}점</p>
                    </div>
                </div>
            )}
        </>
    )
}

export async function fetchTodayTryCount(date : string){
    try {
      const result = await axios.get(`/api/get/ranking?date=${date}`);
      return result.data as TodayPlayData[];
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
}