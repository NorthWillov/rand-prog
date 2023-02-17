import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { convertMsToTime } from "../helpers/msToHour";

const PieRechart = ({ files }) => {
  const [times, setTimes] = useState({ film: 0, promotion: 0 });

  useEffect(() => {
    setTimes({
      film: Object.entries(files)
        .filter((prog) => Number(prog[1].category) === 7)
        .reduce((a, b) => a + b[1].duration * b[1].counter, 0),
      promotion: Object.entries(files)
        .filter((prog) => Number(prog[1].category) === 2)
        .reduce((a, b) => a + b[1].duration * b[1].counter, 0),
    });
  }, [files]);

  const data = [
    {
      name: "Film",
      value: times.film,
    },
    {
      name: "Promotion",
      value: times.promotion,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F"];
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <h2 className="label">{`${convertMsToTime(payload[0].value)}`}</h2>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "-50px" }}>
        <h3 style={{ margin: "0" }}>
          {convertMsToTime(times.film + times.promotion)}
        </h3>
        <p>* +-30 sekundy</p>
      </div>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieRechart;
