// Simple forecast models over an indicator series.
// Educational projections, not financial advice.

import type { IndicatorPoint } from '../../../backend/worldbank'

export interface ForecastPoint {
  year: number
  value: number | null
  forecast: number | null
}

export type ForecastModel = 'linear' | 'movingAverage'

const TREND_WINDOW = 10
const MOVING_AVERAGE_WINDOW = 3
export const FORECAST_HORIZON = 3

// Facts become { value, forecast: null }; the last fact year carries both
// so the dashed forecast line connects to the solid actual line.

export function buildForecastSeries(
  points: IndicatorPoint[],
  model: ForecastModel,
): ForecastPoint[] {
  const facts = points.filter((point) => point.value !== null) as {
    year: number
    value: number
  }[]
  if (facts.length === 0) return []

  const lastFact = facts[facts.length - 1]
  const recent = facts.slice(-TREND_WINDOW)

  let predict: (year: number) => number
  if (model === 'linear' && recent.length >= 2) {
    const n = recent.length
    const meanYear = recent.reduce((sum, point) => sum + point.year, 0) / n
    const meanValue = recent.reduce((sum, point) => sum + point.value, 0) / n
    const denominator = recent.reduce(
      (sum, point) => sum + (point.year - meanYear) ** 2,
      0,
    )
    const slope =
      denominator === 0
        ? 0
        : recent.reduce(
            (sum, point) => sum + (point.year - meanYear) * (point.value - meanValue),
            0,
          ) / denominator
    const intercept = meanValue - slope * meanYear
    predict = (year) => slope * year + intercept
  } else {
    const window = recent.slice(-MOVING_AVERAGE_WINDOW)
    const average =
      window.reduce((sum, point) => sum + point.value, 0) / window.length
    predict = () => average
  }

  const series: ForecastPoint[] = points
    .filter((point) => point.year <= lastFact.year)
    .map((point) => ({ year: point.year, value: point.value, forecast: null }))

  const bridge = series.find((point) => point.year === lastFact.year)
  if (bridge) bridge.forecast = lastFact.value

  for (let step = 1; step <= FORECAST_HORIZON; step++) {
    const year = lastFact.year + step
    series.push({
      year,
      value: null,
      forecast: Math.round(predict(year) * 100) / 100,
    })
  }

  return series
}
