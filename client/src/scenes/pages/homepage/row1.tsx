import DashboardBox from "@/components/DashboardBox";
import { useGetStudentsQuery } from "@/state/api";
import React from 'react';
import { BarChart, Bar } from "recharts";

type Props = {};


    const Row1 = (props: Props) =>  {
    const {data} =  useGetStudentsQuery();
    console.log("🚀 ~ file: row1.tsx:10 ~ Row1 ~ data:", data)
    
    return(
        <>
        <DashboardBox gridArea="a"></DashboardBox> 
        <DashboardBox gridArea="b"></DashboardBox> 
        <DashboardBox gridArea="c"></DashboardBox> 
        </>
    )
}
export default Row1;