import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './Typography.module.scss'

export type TypographyProps<T extends ElementType> = {
  as?: T
  title?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>(props: TypographyProps<T>) => {
  const { as: Component = 'span', title, variant = 'body1' } = props

  const classes = {
    body1: s.body1,
    body2: s.body2,
    caption: s.caption,
    h1: s.h1,
    h2: s.h2,
    h3: s.h3,
    large: s.large,
    link1: s.link1,
    link2: s.link2,
    overline: s.overline,
    subtitle1: s.subtitle1,
    subtitle2: s.subtitle2,
  }

  return <Component className={`${classes[variant]}`}>{title}</Component>
}
