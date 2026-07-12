// The single chart palette for the whole project.
// Hex values mirror tokens.css: SVG attributes cannot resolve CSS variables.

export const CHART = {
  axis: '#8b90a5',
  grid: '#20243a',
  accent: '#4d7cff',
  accentSoft: '#9bb3ff',
  surface: '#10101c',
  text: '#f2f3f8',
} as const

export const TOOLTIP_STYLE = {
  background: CHART.surface,
  border: `1px solid ${CHART.grid}`,
  borderRadius: 2,
  fontSize: 12,
  color: CHART.text,
} as const
