'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

"#99CCFF"
"#6699FF" 
"#3366FF"

// userdata
const data01 = [
  { x: 2, y: 23 },
  { x: 23, y: 51 },
  { x: 12, y: 9 },
  { x: 7, y: 54 },
  { x: 6, y: 33 },
  { x: 1, y: 22 },
  { x: 5, y: 12 },
  { x: 2, y: 10 },
];

// total data
const data02 = [
  { x: 1, y: 11 },
  { x: 2, y: 23 },
  { x: 6, y: 5 },
  { x: 4, y: 45 },
  { x: 9, y: 110 },
  { x: 10, y: 9 },
  { x: 4, y: 42 },
  { x: 2, y: 26 },
  { x: 3, y: 56 },
];

const ScatterChartContainer = ({ width = "100%", height = 350 }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart
        margin={{
          top: 0,
          right: 10,
          bottom: 0,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="시간" unit="" />
        <YAxis type="number" dataKey="y" name="시도" unit="" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Dataset 1" data={data01} fill="#99CCFF" />
        <Scatter name="Dataset 2" data={data02} fill="#3366FF" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartContainer;

const CustomTooltip = (props: TooltipProps<any, any>) => {
    const { payload, active } = props;
  
    if (active && payload && payload.length) {
      const name = payload[0].payload.name;
      return (
        <div style={{
          color: 'black',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}>
          <p className='fw-bold m-0'>{name}</p>
          {payload.map((entry, index) => {
            let content;
            switch (entry.dataKey) {
              case 'uv':
                content = `Unique Visitors: ${entry.value}`;
                break;
              case 'pv':
                content = `Page Views: ${entry.value}`;
                break;
              case 'amt':
                content = `Amount: ${entry.value}`;
                break;
              default:
                content = `${entry.name}: ${entry.value}`;
            }
            return (
              <p key={index} style={{ margin: '5px 0', color: entry.color }}>
                {content}
              </p>
            );
          })}
        </div>
      );
    }
  
    return null;
};
  
