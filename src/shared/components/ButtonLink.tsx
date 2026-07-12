import { Link } from 'react-router-dom'
import type { ComponentProps } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'accent' | 'secondary'

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant
}

export default function ButtonLink({ variant = 'primary', className, ...rest }: ButtonLinkProps) {
  const classes = [styles.button, styles.link, styles[variant], className]
    .filter(Boolean)
    .join(' ')
  return <Link className={classes} {...rest} />
}
