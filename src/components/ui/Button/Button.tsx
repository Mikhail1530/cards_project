import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
} from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'

export type ButtonVariants = 'link' | 'primary' | 'secondary' | 'tertiary'

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

export type ButtonProps<T extends ElementType> = {
  as?: T
  children?: ReactNode | string
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  title?: string
  variant: ButtonVariants
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: PolymorphicRef<T>) => {
    const {
      as: Component = 'button',
      children,
      className,
      fullWidth = true,
      icon,
      variant = 'primary',
      ...rest
    } = props

    const bClassName = clsx(s.button, s[variant], className, fullWidth && s.fullWidth)

    return (
      <Component className={bClassName} ref={ref} {...rest}>
        {icon && <span className={s.icon}>{icon}</span>}
        {children}
      </Component>
    )
  }
)
