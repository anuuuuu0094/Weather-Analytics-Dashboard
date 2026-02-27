import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ---------- Minimal Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={{ fontSize: "12px" }}>
      <strong>{label}</strong> : {payload[0].value} kph
    </div>
  );
};

const WindChart = ({ hourlyData }) => {
  const chartData = hourlyData.map((item) => ({
    time: item.time.split(" ")[1],
    wind: Number(item.wind_kph),
  }));

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">
        Wind Speed Trend (kph)
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* subtle grid */}
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

          <Tooltip content={<CustomTooltip />} />

          {/* clean analytical line */}
          <Line
            type="monotone"
            dataKey="wind"
            stroke="#34d399"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;