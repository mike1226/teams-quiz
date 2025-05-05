// ==============================
// File: src/components/PieChart.tsx
// ==============================
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Props {
  correct: number;
  wrong: number;
}

const COLORS = ["#4caf50", "#f44336"];

const ResultPie: React.FC<Props> = ({ correct, wrong }) => {
  const data = [
    { name: "正确", value: correct },
    { name: "错误", value: wrong }
  ];
  return (
    <PieChart width={300} height={300}>
      <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ResultPie;