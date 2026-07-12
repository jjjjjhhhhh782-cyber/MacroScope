import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { IndicatorPoint } from '../../backend/worldbank'

// The single chart style for the whole project.
// Hex values mirror tokens.css: SVG attributes cannot resolve CSS variables.
const AXIS_COLOR = '#8b90a5'
const GRID_COLOR = '#20243a'
const ACCENT = '#4d7cff'
const SURFACE = '#10101c'
const TEXT = '#f2f3f8'

export interface ChartMarker {
  year: number
  label: string
}

interface IndicatorLineChartProps {
  data: IndicatorPoint[]
  unit?: string
  seriesName?: string
  markers?: ChartMarker[]
  height?: number
}

export default function IndicatorLineChart({
  data,
  unit = '',
  seriesName = 'Value',
  markers = [],
  height = 260,
}: IndicatorLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 12, right: 16, bottom: 4, left: 0 }}>
        <CartesianGrid stroke={GRID_COLOR} vertical={false} />
        <XAxis
          dataKey="year"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickCount={8}
          allowDecimals={false}
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          axisLine={{ stroke: GRID_COLOR }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={48}
          tickFormatter={(value) => `${value}${unit}`}
        />
        <Tooltip
          contentStyle={{
            background: SURFACE,
            border: `1px solid ${GRID_COLOR}`,
            borderRadius: 2,
            fontSize: 12,
            color: TEXT,
          }}
          labelStyle={{ color: AXIS_COLOR }}
          formatter={(value) => [`${Number(value).toFixed(2)}${unit}`, seriesName]}
          labelFormatter={(label) => String(label)}
        />
        {markers.map((marker) => (
          <ReferenceLine
            key={marker.year}
            x={marker.year}
            stroke={AXIS_COLOR}
            strokeDasharray="4 4"
            label={{ value: marker.label, fill: AXIS_COLOR, fontSize: 11, position: 'insideTop' }}
          />
        ))}
        <Line
          type="monotone"
          dataKey="value"
          stroke={ACCENT}
          strokeWidth={2}
          dot={false}
          connectNulls
          name={seriesName}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
