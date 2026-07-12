import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  title: string
  children: ReactNode
  footer: ReactNode
}

export default function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.wordmark}>
        MacroScope
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
      <p className={styles.footer}>{footer}</p>
    </div>
  )
}
