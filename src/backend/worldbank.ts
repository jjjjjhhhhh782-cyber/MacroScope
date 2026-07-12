// Direct access to the open World Bank API. No key required.
// Modules should not import this file directly: use indicators.ts,
// which adds the Supabase cache on top.

export interface IndicatorPoint {
  year: number
  value: number | null
}

const API_BASE = 'https://api.worldbank.org/v2'

interface WorldBankRow {
  date: string
  value: number | null
}

export async function fetchIndicatorFromApi(
  countryCode: string,
  indicatorCode: string,
  fromYear = 1990,
  toYear = 2025,
): Promise<IndicatorPoint[]> {
  const url = `${API_BASE}/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=200&date=${fromYear}:${toYear}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`World Bank API error: ${response.status}`)
  }
  const payload = (await response.json()) as unknown
  if (!Array.isArray(payload) || payload.length < 2) {
    throw new Error('World Bank API returned an unexpected response')
  }
  const rows = (payload[1] ?? []) as WorldBankRow[]
  return rows
    .map((row) => ({
      year: Number(row.date),
      value: row.value === null ? null : Number(row.value),
    }))
    .filter((point) => Number.isFinite(point.year))
    .sort((a, b) => a.year - b.year)
}
