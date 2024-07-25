'use client';

import React from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

// 데이터 정의
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default function AreaChartContainer() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="uv" stackId="data" stroke="#99CCFF" fill="#99CCFF" />
        <Area type="monotone" dataKey="pv" stackId="data" stroke="#6699FF" fill="#6699FF" />
        <Area type="monotone" dataKey="amt" stackId="data" stroke="#3366FF" fill="#3366FF" />
      </AreaChart>
    </ResponsiveContainer>
  );

};

const CustomTooltip = (props :TooltipProps<any, any>) => {
    const { payload, active } = props;
  
    if (active && payload && payload.length) {
      return (
        <div style={{
            color : 'black',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}>
          <p className='fw-bold m-0'>테스트</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '5px 0', color: entry.stroke }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
};