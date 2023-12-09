import { ReactNode } from 'react'
import s from './Page.module.scss'
import { clsx } from 'clsx'

type PagePropsType = {
  children: ReactNode
  className?: string
}

export const Page = ({ children, className }: PagePropsType) => {
  const classNames = {
    page: clsx(s.page, className),
  }

  return <div className={classNames.page}>{children}</div>
}
