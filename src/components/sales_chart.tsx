import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const salesData = [
  { month: "JAN", sales: 1200 },
  { month: "FEB", sales: 1500 },
  { month: "MAR", sales: 1100 },
  { month: "APR", sales: 2900 },
  { month: "MAY", sales: 3200 },
  { month: "JUN", sales: 2700 },
  { month: "JUL", sales: 3400 },
  { month: "AUG", sales: 3300 },
  { month: "SEP", sales: 2500 },
  { month: "OCT", sales: 2200 },
  { month: "NOV", sales: 2800 },
  { month: "DEC", sales: 3700 },
];

const SalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={salesData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          stroke="#A1A1AA"
          tick={{ fontSize: 12, fill: "#333" }}
        />
        <YAxis
          tickFormatter={(value) => `${value / 1000}k`}
          stroke="#A1A1AA"
          tick={{ fontSize: 12, fill: "#333" }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#333", borderColor: "#333" }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#fff" }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          fill="#2563eb80"
          fillOpacity={0.4}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{
            r: 5,
            stroke: "#2563eb",
            strokeWidth: 2,
            fill: "#fff",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
