import { supabase } from './supabaseClient'
import type { AiHistoryRow } from './types'

export async function askAi(question: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('ai-explain', {
    body: { question },
  })
  if (error) {
    throw new Error('AI request failed. Check that the edge function is deployed.')
  }
  if (data?.error) {
    throw new Error(data.error)
  }
  if (typeof data?.answer !== 'string') {
    throw new Error('AI returned an unexpected response')
  }
  return data.answer
}

export async function getAiHistory(limit = 10): Promise<AiHistoryRow[]> {
  const { data, error } = await supabase
    .from('ai_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return (data ?? []) as AiHistoryRow[]
}

export async function saveAiAnswer(
  userId: string,
  question: string,
  answer: string,
): Promise<void> {
  const { error } = await supabase.from('ai_history').insert({
    user_id: userId,
    question,
    answer,
  })
  if (error) {
    console.warn('Failed to save AI history:', error.message)
  }
}
