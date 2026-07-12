import ButtonLink from './ButtonLink'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <span className={styles.code}>404</span>
      <p className={styles.text}>This page does not exist.</p>
      <ButtonLink to="/" variant="secondary">
        Back to MacroScope
      </ButtonLink>
    </main>
  )
}
