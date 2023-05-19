import DashboardBox from "@/components/DashboardBox";
import { useGetStudentsQuery } from "@/state/api";
import React, { PureComponent, useMemo } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  LineChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  TooltipProps,
} from "recharts";
import BoxHeader from "@/components/BoxHeader";
import { useTheme } from "@mui/material";

//type Props = {}
const gender = [
  { name: "Male", value: 550 },
  { name: "Female", value: 450 },
];

const participation = [
  {
    class: "class 1",
    a: 500,
    b: 240,
    c: 244,
  },
  {
    class: "class 2",
    a: 400,
    b: 138,
    c: 221,
  },
  {
    class: "class 3",
    a: 455,
    b: 980,
    c: 220,
  },
  {
    class: "class 4",
    a: 480,
    b: 390,
    c: 200,
  },
  {
    class: "class 5",
    a: 490,
    b: 380,
    c: 218,
  },
  {
    class: "class 6",
    a: 600,
    b: 300,
    c: 250,
  },
  {
    class: "class 7",
    a: 620,
    b: 400,
    c: 100,
  },
  {
    class: "class 8",
    a: 890,
    b: 480,
    c: 300,
  },
  {
    class: "class 9",
    a: 800,
    b: 380,
    c: 250,
  },
  {
    class: "class 10",
    a: 803,
    b: 430,
    c: 200,
  },
];

const Row3 = () => {
  const theme = useTheme();

  const toPercent = (decimal: number, fixed = 0) =>
    `${(decimal * 100).toFixed(fixed)}%`;
  const getPercent = (value: number, total: number) => {
    const ratio = total > 0 ? value / total : 0;
    return toPercent(ratio, 2);
  };

  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce(
      (result: any, entry: { value: any }) => result + entry.value,
      0
    );

    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map(
            (entry: { color: any; name: any; value: number }, index: any) => (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}(${getPercent(
                  entry.value,
                  total
                )})`}
              </li>
            )
          )}
        </ul>
      </div>
    );
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Gender ratio:"
          // subtitle="The lines represents current and previous year attendance."
          //sideText="Increases by  +14%"
        />
        <ResponsiveContainer width="100%" height="70%">
          <PieChart width={400} height={400}>
            <Pie
              data={gender}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {gender.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>

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
            <Area
              type="monotone"
              dataKey="a"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="b"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="c"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  );
};
export default Row3;
