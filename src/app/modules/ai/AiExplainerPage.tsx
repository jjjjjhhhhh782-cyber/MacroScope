import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Card, LoadingState, PageLayout } from '../../../shared/components'
import { useAsyncData } from '../../../shared/hooks/useAsyncData'
import { askAi, getAiHistory, saveAiAnswer } from '../../../backend/ai'
import { useAuth } from '../../auth/AuthProvider'
import styles from './AiExplainerPage.module.css'

const CRISES = [
  { id: 'depression', label: 'Great Depression, 1929' },
  { id: 'oil', label: 'Oil shock, 1973' },
  { id: 'asian', label: 'Asian financial crisis, 1997' },
  { id: 'russian', label: 'Russian default, 1998' },
  { id: 'dotcom', label: 'Dot com crash, 2000' },
  { id: 'gfc', label: 'Global financial crisis, 2008' },
  { id: 'covid', label: 'COVID recession, 2020' },
]

export default function AiExplainerPage() {
  const { session } = useAuth()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [answeredQuestion, setAnsweredQuestion] = useState('')
  const [error, setError] = useState('')
  const [asking, setAsking] = useState(false)

  const history = useAsyncData(() => getAiHistory(), [])

  async function ask(text: string) {
    const trimmed = text.trim()
    if (!trimmed || asking) return
    setAsking(true)
    setError('')
    setAnswer('')
    try {
      const result = await askAi(trimmed)
      setAnswer(result)
      setAnsweredQuestion(trimmed)
      if (session) {
        await saveAiAnswer(session.user.id, trimmed, result)
        history.reload()
      }
    } catch (askError) {
      setError(askError instanceof Error ? askError.message : 'Something went wrong')
    } finally {
      setAsking(false)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    void ask(question)
  }

  function handleCrisis(label: string) {
    const text = `Explain the ${label}: causes, mechanics and consequences.`
    setQuestion(text)
    void ask(text)
  }

  return (
    <PageLayout
      title="AI Crisis Explainer"
      subtitle="Pick a crisis or ask your own question, AI answers in plain language"
    >
      <Card title="Pick a crisis">
        <div className={styles.crises}>
          {CRISES.map((crisis) => (
            <button
              key={crisis.id}
              className={styles.chip}
              onClick={() => handleCrisis(crisis.label)}
              disabled={asking}
            >
              {crisis.label}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Or ask your own question">
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Why do currencies collapse during a crisis?"
            rows={3}
            maxLength={500}
          />
          {error ? <p className={styles.error}>{error}</p> : null}
          <div>
            <Button variant="accent" type="submit" disabled={asking || !question.trim()}>
              {asking ? 'Thinking' : 'Explain'}
            </Button>
          </div>
        </form>
      </Card>

      {asking ? <LoadingState label="The AI is thinking about your question" /> : null}

      {answer && !asking ? (
        <Card title={answeredQuestion}>
          <p className={styles.answer}>{answer}</p>
        </Card>
      ) : null}

      <Card title="Your recent questions">
        {history.loading ? (
          <p className={styles.empty}>Loading history</p>
        ) : !history.data || history.data.length === 0 ? (
          <p className={styles.empty}>No questions yet. Ask something above.</p>
        ) : (
          <div className={styles.history}>
            {history.data.map((row) => (
              <details key={row.id} className={styles.historyItem}>
                <summary className={styles.historyQuestion}>{row.question}</summary>
                <p className={styles.historyAnswer}>{row.answer}</p>
              </details>
            ))}
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
