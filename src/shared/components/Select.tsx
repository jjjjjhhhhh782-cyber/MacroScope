import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export default function Select({ label, id, children, ...rest }: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <select className={styles.select} id={selectId} {...rest}>
        {children}
      </select>
    </div>
  )
}
