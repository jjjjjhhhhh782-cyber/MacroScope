import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../shared/components'
import { friendlyAuthError, signUp } from '../../backend/auth'
import { useAuth } from './AuthProvider'
import AuthLayout from './AuthLayout'
import styles from './AuthLayout.module.css'

export default function SignUpPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/app" replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (!email || !password || !confirm) {
      setError('Fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    const { data, error: authError } = await signUp(email, password)
    setSubmitting(false)
    if (authError) {
      setError(friendlyAuthError(authError.message))
      return
    }
    if (data.session) {
      navigate('/app')
      return
    }
    setNotice('Check your email to confirm your account, then sign in.')
  }

  return (
    <AuthLayout
      title="Create account"
      footer={
        <>
          Already registered? <Link to="/signin">Sign in</Link>
        </>
      }
    >
      {notice ? (
        <p className={styles.notice}>{notice}</p>
      ) : (
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
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            autoComplete="new-password"
          />
          {error ? <p className={styles.formError}>{error}</p> : null}
          <Button variant="accent" type="submit" disabled={submitting}>
            {submitting ? 'Creating account' : 'Create account'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
