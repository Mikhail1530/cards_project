import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
} from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'
import { Link } from 'react-router-dom'

export type ButtonVariants = 'link' | 'primary' | 'secondary' | 'tertiary' | 'icon'

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

    const isLink = Component === Link
    const classNames = {
      component: clsx(s.button, s[variant], className, fullWidth && s.fullWidth, isLink && s.link),
      icon: clsx(s.icon, s[variant]),
    }

    return (
      <Component className={classNames.component} ref={ref} {...rest}>
        {icon && <span className={classNames.icon}>{icon}</span>}
        {children}
      </Component>
    )
  }
)
