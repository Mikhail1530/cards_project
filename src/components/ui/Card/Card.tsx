import { ComponentProps, ElementType, ReactNode } from 'react'
import s from '@/components/ui/Card/Card.module.scss'

export type CardProps<T extends ElementType> = {
  as?: T
  icon?: ReactNode
  // title?: string
  className?: string
} & ComponentProps<T>

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  // <T extends ElementType = 'div'> this means that by default T is 'div' but can be any other Element.
  const { as: Component = 'div', className, icon, children, ...rest } = props

  return (
    <Component className={`${s.card} ${className ?? ''}`} {...rest}>
      {icon && <div className={s.icon}>{icon}</div>}
      {children}
    </Component>
  )
}
