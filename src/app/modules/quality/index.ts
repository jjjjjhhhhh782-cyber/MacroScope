// Composite Quality of Life Index.
// Method: latest value per indicator, min max normalization to 0..100
// across ranked countries (GDP per capita on a log scale, inflation and
// unemployment inverted because lower is better), then a weighted sum.

export interface CountryMetrics {
  code: string
  name: string
  gdpPerCapita: number | null
  lifeExpectancy: number | null
  inflation: number | null
  unemployment: number | null
}

export interface Subscores {
  gdp: number
  life: number
  inflation: number
  unemployment: number
}

export interface ScoredCountry extends CountryMetrics {
  score: number
  rank: number
  subscores: Subscores
}

export const WEIGHTS = {
  gdp: 0.3,
  life: 0.3,
  inflation: 0.2,
  unemployment: 0.2,
} as const

// Hyperinflation outliers would compress every other country toward 100,
// so inflation is capped before normalization.
export const INFLATION_CAP = 30

function normalize(values: number[]): (value: number) => number {
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (max === min) return () => 50
  return (value) => ((value - min) / (max - min)) * 100
}

export function computeScores(rows: CountryMetrics[]): {
  scored: ScoredCountry[]
  excluded: string[]
} {
  const complete = rows.filter(
    (row) =>
      row.gdpPerCapita !== null &&
      row.lifeExpectancy !== null &&
      row.inflation !== null &&
      row.unemployment !== null,
  )
  const excluded = rows
    .filter((row) => !complete.includes(row))
    .map((row) => row.name)

  if (complete.length === 0) return { scored: [], excluded }

  const gdpScale = normalize(complete.map((row) => Math.log10(row.gdpPerCapita as number)))
  const lifeScale = normalize(complete.map((row) => row.lifeExpectancy as number))
  const inflationScale = normalize(
    complete.map((row) => Math.min(row.inflation as number, INFLATION_CAP)),
  )
  const unemploymentScale = normalize(complete.map((row) => row.unemployment as number))

  const scored = complete
    .map((row) => {
      const subscores: Subscores = {
        gdp: gdpScale(Math.log10(row.gdpPerCapita as number)),
        life: lifeScale(row.lifeExpectancy as number),
        inflation: 100 - inflationScale(Math.min(row.inflation as number, INFLATION_CAP)),
        unemployment: 100 - unemploymentScale(row.unemployment as number),
      }
      const score =
        subscores.gdp * WEIGHTS.gdp +
        subscores.life * WEIGHTS.life +
        subscores.inflation * WEIGHTS.inflation +
        subscores.unemployment * WEIGHTS.unemployment
      return { ...row, score: Math.round(score * 10) / 10, subscores, rank: 0 }
    })
    .sort((a, b) => b.score - a.score)
    .map((row, index) => ({ ...row, rank: index + 1 }))

  return { scored, excluded }
}
