import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './Button.module.scss'
import { clsx } from "clsx";

export type ButtonProps<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  icon?: ReactNode
  title?: string
  variant: 'link' | 'primary' | 'secondary' | 'tertiary'
  children?: string
  className?: string
} & ComponentPropsWithoutRef<T>


export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    icon,
    className,
    children,
    fullWidth = true,
    variant = 'primary',
    ...rest
  } = props

  const bClassName = clsx(s.button, s[variant], className, fullWidth && s.fullWidth )

  return (
    <Component className={bClassName}{...rest}>
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </Component>
  )
}
