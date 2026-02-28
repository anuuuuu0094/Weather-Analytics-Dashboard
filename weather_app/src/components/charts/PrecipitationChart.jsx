import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={{ fontSize: "12px" }}>
      <strong>{label}</strong> : {payload[0].value} mm
    </div>
  );
};

const PrecipitationChart = ({ hourlyData }) => {
  const chartData = hourlyData.map((item) => ({
    time: item.time.split(" ")[1],
    rain: item.precip_mm,
  }));

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">
        Hourly Precipitation (mm)
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
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

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="rain"
            fill="#60a5fa"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;