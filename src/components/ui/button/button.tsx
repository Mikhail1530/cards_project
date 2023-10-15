import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType> = {
  // ElementType makes it able to pass any html Tag. But only tag.
  as?: T
  fullWidth?: boolean
  icon?: ReactNode
  title?: string
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T> // get default props for element

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
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
      className={` ${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      title={title}
      {...rest}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </button>
  )
}
// smotretj UI kit storybook
// v knopku dobavitj Icon
