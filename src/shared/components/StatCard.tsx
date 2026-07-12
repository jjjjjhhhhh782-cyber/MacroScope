import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string
  hint?: string
}

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </div>
  )
}
