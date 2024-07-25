'use client';

import axios from 'axios';
import React from 'react';
import { ComposedChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, YAxis, XAxis, Line, Legend, Bar } from 'recharts';

// 데이터 정의
// date : 날짜, name : 정답, try: 시도횟수, time : 걸린 시간
const data = [
  { index : 1, name: '2024-07-01', answer: '안녕', tryCount: 40, time: 24, avgTryCount : 20, avgTime : 12 },
  { index : 2, name: '2024-07-02', answer: '바보', tryCount: 30, time: 139, avgTryCount : 12, avgTime : 15 },
  { index : 3, name: '2024-07-03', answer: '메롱', tryCount: 20, time: 98, avgTryCount : 30, avgTime : 21 },
  { index : 4, name: '2024-07-04', answer: '뿡', tryCount: 27, time: 39, avgTryCount : 24, avgTime : 18 },
  { index : 5, name: '2024-07-05', answer: '웃음', tryCount: 18, time: 48, avgTryCount : 52, avgTime : 24 },
  { index : 6, name: '2024-07-06', answer: '비', tryCount: 23, time: 14, avgTryCount : 22, avgTime : 30 },
  { index : 7, name: '2024-07-07', answer: '더위', tryCount: 34, time: 43, avgTryCount : 30, avgTime : 14 },
];

export default function ComposedChartContainer() {

  // axios('/api/get/count');

  return (
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
        <Bar type="monotone" dataKey="avgTryCount" stackId="a" fill="#009966" opacity={0.8} />
        <Bar type="monotone" dataKey="avgTime" stackId="a" fill="#66CC99" opacity={0.8} />
        <Area type="monotone" dataKey="tryCount" stackId="data" stroke="#0033CC" fill="#0033CC" opacity={0.8} />
        <Area type="monotone" dataKey="time" stackId="data" stroke="#3366CC" fill="#3366CC" opacity={0.8} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  const { payload, active } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const { name, answer, tryCount, time, avgTryCount, avgTime } = data;
    return (
      <div style={{
        color: 'black',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      }}>
        <p className='fw-bold m-0'>날짜: {name}</p>
        <p className='m-0'>정답: {answer}</p>
        <p className='m-0' style={{color : '#3366CC'}}>걸린 시간: {time}분</p>
        <p className='m-0' style={{color : '#0033CC'}}>시도 횟수: {tryCount}회</p>
        <p className='m-0' style={{color : '#66CC99'}}>평균 걸린 시간: {avgTime}분</p>
        <p className='m-0' style={{color : '#009966'}}>평균 시도 횟수: {avgTryCount}회</p>
      </div>
    );
  }

  return null;
};
