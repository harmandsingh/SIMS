import DashboardBox from "@/components/DashboardBox";
import { useGetStudentsQuery } from "@/state/api";
import React, { PureComponent, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from "@mui/material";

type Props = {};

// const Row1 = (props: Props) =>  {
// const { data } =  useGetStudentsQuery();
// console.log("🚀 ~ file: row1.tsx:10 ~ Row1 ~ data:", data)


const attendance = [

    {
        month: 'April',
        presentStu: 1780,
        pv: 3908,
        previous: 1290,
    },
    {
        month: 'June',
        presentStu: 890,
        pv: 4800,
        previous: 790,
    },
    {
        month: 'July',
        presentStu: 1390,
        pv: 3800,
        previous: 1300,
    },
    {
        month: 'Aug',
        presentStu: 2490,
        pv: 4300,
        previous: 1790,
    },
    {
        month: 'Sept',
        presentStu: 2490,
        pv: 4300,
        previous: 2090,
    }, {
        month: 'Oct',
        presentStu: 2590,
        pv: 4300,
        previous: 2290,
    }, {
        month: 'Nov',
        presentStu: 2400,
        pv: 4300,
        previous: 2090,
    }, {
        month: 'Dec',
        presentStu: 2490,
        pv: 4300,
        previous: 2000,
    },
    {
        month: 'Jan',
        presentStu: 3000,
        pv: 2400,
        previous: 2700,
    },
    {
        month: 'Feb',
        presentStu: 2000,
        pv: 1398,
        previous: 1790,
    },
    {
        month: 'Mar',
        presentStu: 1000,
        pv: 9800,
        previous: 790,
    },
];


const Row1 = (props: Props) => {
    const { palette } = useTheme();

    return (
        <>
            <DashboardBox gridArea="a">
                 <BoxHeader
                    subtitle="Student's attendance"
                  //  subtitle="The top line represents students attended the school."
                    //sideText="+4%"
                />

                <ResponsiveContainer width="100%" height="100%">
                    
                    <AreaChart
                        width={500}
                        height={400}
                        data={attendance}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tickLine ={false} style={{fontSize: "10px"}}/>
                        <YAxis tickLine={false} axisLine={{strokeWidth:"0"}} style={{fontSize:"10px"}} domain={[500, 3000]}/>
                        <Tooltip />
                        <Area type="monotone" dataKey="presentStu" dot={true} stroke={palette.secondary.main}  fill="url(#colorCurrent)" />
                        <Area type="monotone" dataKey="previous" dot={true}  stroke={palette.secondary.main}  fill="url(#colorPrevious)" />

                    </AreaChart>
                </ResponsiveContainer> 
            </DashboardBox>

            <DashboardBox gridArea="b"></DashboardBox>
            <DashboardBox gridArea="c"></DashboardBox>
        </>
    );
}



export default Row1;