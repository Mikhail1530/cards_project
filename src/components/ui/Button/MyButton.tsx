import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './MyButton.module.scss'

export type ButtonProps<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  icon?: ReactNode
  title?: string
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
  children?: string
  className: string
} & ComponentPropsWithoutRef<T>

export const MyButton = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    icon,
    title = '',
    variant = 'primary',
    ...rest
  } = props

  return (
    <button
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      title={title}
      {...rest}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </button>
  )
}
