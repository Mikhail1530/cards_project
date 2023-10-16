import { ComponentProps, ReactNode } from 'react'
import s from "@/components/ui/button/button.module.scss";


type CommonProps = {
  children: ReactNode
  contentClassName?: string
} & ComponentProps<'div'>

type ConditionalProps =
  | {
  iconComponent?: ReactNode
  title?: string
}

export type CardProps = CommonProps & ConditionalProps

export const Card = (props: CardProps) => {
  const { children, className, contentClassName, iconComponent, title, ...rest }= props

  return (
    <div className={` ${s.card} ${className}`} title={title}{...rest}>
      card
      {iconComponent}
    </div>
  )
}