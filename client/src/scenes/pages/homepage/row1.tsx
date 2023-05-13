import DashboardBox from "@/components/DashboardBox";
import { useGetStudentsQuery } from "@/state/api";
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {};

// const Row1 = (props: Props) =>  {
// const { data } =  useGetStudentsQuery();
// console.log("🚀 ~ file: row1.tsx:10 ~ Row1 ~ data:", data)
const data = [
    {
        name: 'January',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Febrauary',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'June',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'July',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'August',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'September',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },{
        name: 'October',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },{
        name: 'November',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },{
        name: 'December',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Row1 = (props: Props) => {
    return (
        <>
            <DashboardBox gridArea="a"><ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="b"></DashboardBox>
            <DashboardBox gridArea="c"></DashboardBox>
        </>
    );
}



export default Row1;