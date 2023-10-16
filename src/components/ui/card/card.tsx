import { ComponentProps, ReactNode } from 'react'
import s from "@/components/ui/button/button.module.scss";


type CommonProps = {
  children: ReactNode
} & ComponentProps<'div'>

type ConditionalProps = {
  icon?: ReactNode
  title?: string
}

export type CardProps = CommonProps & ConditionalProps

export const Card = (props: CardProps) => {
  const { children, className, icon, title, ...rest }= props

  return (
    <div className={` ${className}`} title={title}{...rest}>
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </div>
  )
}