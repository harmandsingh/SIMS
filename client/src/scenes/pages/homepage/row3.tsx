import DashboardBox from "@/components/DashboardBox";
import { useGetStudentsQuery } from "@/state/api";
import React, { PureComponent, useMemo } from 'react';
import { LineChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from "@mui/material";

//type Props = {}
const participation = [
    {
      class: 'class 1',
      a: 500,
      b: 240,
      c: 244,
    },
    {
      class: 'class 2',
      a: 400,
      b: 138,
      c: 221,
    },
    {
      class: 'class 3',
      a: 455,
      b: 980,
      c: 220,
    },
    {
        class: 'class 4',
      a: 480,
      b: 390,
      c: 200,
    },
    {
        class: 'class 5',
      a: 490,
      b: 380,
      c: 218,
    },
    {
        class: 'class 6',
      a: 600,
      b: 300,
      c: 250,
    },
    {
        class: 'class 7',
      a: 620,
      b: 400,
      c: 100,
    },
    {
        class: 'class 8',
        a: 890,
        b: 480,
        c: 300,
      },
      {
        class: 'class 9',
        a: 800,
        b: 380,
        c: 250,
      },
      {
        class: 'class 10',
        a: 803,
        b: 430,
        c: 200,
      },
  ];

const Row3 = () => {
    const { palette } = useTheme();
    
    const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
    const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
    };

    const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => result + entry.value, 0);

            return (
                <div className="customized-tooltip-content">
                <p className="total">{`${label} (Total: ${total})`}</p>
                <ul className="list">
                    {payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                    ))}
                </ul>
                </div>
            );
            };
    return(
        <>
        <DashboardBox gridArea="g"></DashboardBox> 

        <DashboardBox gridArea="h">
            <BoxHeader
                        title="Student's performance from class 1 to 10: "
                        // subtitle="The lines represents current and previous year attendance."
                        //sideText="Increases by  +14%"
                    />
            <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={participation}
                        stackOffset="expand"
                        margin={{
                            top: 8,
                            right: 20,
                            left: 10,
                            bottom: 55,
                        }}
                        >
                        <XAxis dataKey="class" />
                        <YAxis tickFormatter={toPercent} tickLine={false} />
                        <Tooltip content={renderTooltipContent} />
                        <Area type="monotone" dataKey="a" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="b" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="c" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                    </ResponsiveContainer>
        </DashboardBox> 
        
        <DashboardBox gridArea="i"></DashboardBox>    
        <DashboardBox gridArea="j"></DashboardBox>
        </>
    )
}
export default Row3;