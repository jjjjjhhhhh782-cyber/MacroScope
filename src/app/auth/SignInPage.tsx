import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../shared/components'
import { friendlyAuthError, signIn } from '../../backend/auth'
import { useAuth } from './AuthProvider'
import AuthLayout from './AuthLayout'
import styles from './AuthLayout.module.css'

export default function SignInPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/app" replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Enter your email and password')
      return
    }
    setSubmitting(true)
    const { error: authError } = await signIn(email, password)
    setSubmitting(false)
    if (authError) {
      setError(friendlyAuthError(authError.message))
      return
    }
    navigate('/app')
  }

  return (
    <AuthLayout
      title="Sign in"
      footer={
        <>
          No account yet? <Link to="/signup">Create one</Link>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
        {error ? <p className={styles.formError}>{error}</p> : null}
        <Button variant="accent" type="submit" disabled={submitting}>
          {submitting ? 'Signing in' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
