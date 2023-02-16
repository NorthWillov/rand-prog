// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

// const PieRechart = ({ files }) => {
//   const [times, setTimes] = useState({ film: 0, promotion: 0 });

//   useEffect(() => {
//     setTimes({
//       film: Object.entries(files)
//         .filter((prog) => Number(prog[1].category) === 7)
//         .reduce((a, b) => a + b[1].duration, 0),
//       promotion: Object.entries(files)
//         .filter((prog) => Number(prog[1].category) === 2)
//         .reduce((a, b) => a + b[1].duration, 0),
//     });
//   }, []);

//   const data = [
//     {
//       name: "Film",
//       value: times.film,
//     },
//     {
//       name: "Promotion",
//       value: times.promotion,
//     },
//   ];

//   const COLORS = ["#0088FE", "#00C49F"];

//   return (
//     <div style={{ margin: "0 auto" }}>
//       <PieChart width={400} height={400}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label
//           outerRadius={120}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default PieRechart;

import React from "react";

const PieRechart = ({ files }) => {
  return <div></div>;
};

export default PieRechart;
