'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { ComposedChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, YAxis, XAxis, Line, Legend, Bar } from 'recharts';
import LoadingSpinner from '../loading-container/LoadingSpinner';
import { AvgObjectByDateType } from '@/pages/api/get/count';
// 데이터 색 정의

const DataColor = {
  tryCount : '#3333FF',
  time : '#6699FF',
  avgTryCount : '#009966',
  avgTime : '#66CC99'
}

export default function ComposedChartContainer() {

  const { data, isLoading, isError} = useQuery({
    queryKey : ['data'],
    queryFn : fetchGraphData
  })

  if(data === undefined || isLoading) return <LoadingSpinner />
  if(isError) return <p className='text-center'>예상치 못한 에러가 발생했어요.</p>

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart  
          margin={{
            top: 10,
            right: 0,
            left: -30,
            bottom: 0,
          }}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar type="monotone" dataKey="avgTryCount" stackId="a" fill={DataColor.avgTryCount} opacity={1} />
          <Bar type="monotone" dataKey="avgTime" stackId="a" fill={DataColor.avgTime} opacity={1} />
          <Area type="monotone" dataKey="tryCount" stackId="data" stroke={DataColor.tryCount} fill={DataColor.tryCount} opacity={0.7} />
          <Area type="monotone" dataKey="time" stackId="data" stroke={DataColor.time} fill={DataColor.time} opacity={0.7} />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  const { payload, active } = props;

  if (active && payload && payload.length) {

    const data = payload[0].payload;

    const { 
      date, 
      answer, 
      tryCount, 
      time, 
      avgTryCount, 
      avgTime,
      percentileTime,
      percentileTry,
    } = data;

    return (
      <div style={{
        color: 'black',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      }}>
        <p className='m-0'>{date}</p>
        <hr className='m-0'/>

        <p className='m-0'><span style={{color : '#006699'}}>{answer}</span></p>
        <hr className='m-0'/>

        <p className='m-0'>
          나의 걸린 시간:&nbsp; 
          <span style={{color : DataColor.time}}>{time}&nbsp;</span>
          분 (상위 {percentileTime !== 0 ? percentileTime : 1}%)
        </p>
        <hr className='m-0'/>

        <p className='m-0'>
          나의 시도 횟수:&nbsp; 
          <span style={{color : DataColor.tryCount}}>{tryCount}&nbsp;</span>
          회 (상위 {percentileTry !== 0 ? percentileTry : 1}%)
        </p>
        <hr className='m-0'/>

        <p className='m-0'>평균 걸린 시간: <span style={{color : DataColor.avgTime}}>{avgTime}&nbsp;</span>분</p>
        <hr className='m-0'/>

        <p className='m-0'>평균 시도 횟수: <span style={{color : DataColor.avgTryCount}}>{avgTryCount}&nbsp;</span>회</p>
        <hr className='m-0'/>

      </div>
    );
  }

  return null;
};

async function fetchGraphData(): Promise<AvgObjectByDateType[] | undefined> {
  try {
    const result = await axios.get('/api/get/count');
    return result.data as AvgObjectByDateType[];
  } catch (error) {
    console.error('Error fetching graph data:', error);
  }
}