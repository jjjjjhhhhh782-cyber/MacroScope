export interface Profile {
  id: string
  email: string | null
  created_at: string
}

export interface IndicatorCacheRow {
  id: number
  country_code: string
  indicator_code: string
  data: unknown
  fetched_at: string
}

export interface AiHistoryRow {
  id: number
  user_id: string
  question: string
  answer: string
  created_at: string
}
