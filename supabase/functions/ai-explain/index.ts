// AI Crisis Explainer edge function.
// Runs on Supabase servers. The Anthropic API key lives in Supabase secrets
// and never reaches the browser. JWT verification is on by default, so only
// signed in users can call this function.

const SYSTEM_PROMPT = `You are the AI Crisis Explainer inside MacroScope, a macroeconomic analytics platform.
Explain economic crises and macroeconomic concepts in plain language for a curious beginner.
Structure the answer in short paragraphs covering causes, mechanics, consequences and lessons where relevant.
Keep the answer under 400 words. Do not use emoji.
If the question is not about economics, finance or economic history, politely decline in one sentence and suggest asking about an economic topic instead.`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let question: unknown
  try {
    const body = await req.json()
    question = body.question
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400)
  }

  if (typeof question !== 'string' || question.trim().length === 0 || question.length > 500) {
    return jsonResponse({ error: 'Provide a question up to 500 characters' }, 400)
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) {
    return jsonResponse({ error: 'AI is not configured on the server yet' }, 500)
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-8',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: question }],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Anthropic API error:', response.status, detail)
    return jsonResponse({ error: 'The AI service is unavailable right now, try again later' }, 502)
  }

  const data = await response.json()
  const textBlock = Array.isArray(data.content)
    ? data.content.find((block: { type: string }) => block.type === 'text')
    : null

  if (!textBlock || data.stop_reason === 'refusal') {
    return jsonResponse({ error: 'The AI could not answer this question' }, 502)
  }

  return jsonResponse({ answer: textBlock.text })
})
