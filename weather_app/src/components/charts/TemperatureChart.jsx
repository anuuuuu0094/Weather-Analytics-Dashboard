import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={{ fontSize: "12px" }}>
      <strong>{label}</strong> : {payload[0].value}°{unit}
    </div>
  );
};

const TemperatureChart = ({ hourlyData, unit }) => {
  const convert = (tempC) =>
    unit === "C" ? tempC : (tempC * 9) / 5 + 32;

  const chartData = hourlyData.map((item) => ({
    time: item.time.split(" ")[1],
    temp: Number(convert(item.temp_c).toFixed(1)),
  }));

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">
        Hourly Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff14" />

          <XAxis
            dataKey="time"
            stroke="#cbd5e1"
            tick={{ fontSize: 11 }}
            tickMargin={6}
          />

          <YAxis
            stroke="#cbd5e1"
            tick={{ fontSize: 11 }}
            tickMargin={6}
          />

          <Tooltip content={<CustomTooltip unit={unit} />} />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#4da3ff"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;