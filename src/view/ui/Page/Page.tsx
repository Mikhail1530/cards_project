import { ReactNode } from 'react'
import s from './Page.module.scss'

type PagePropsType = {
  children: ReactNode
}

export const Page = ({ children }: PagePropsType) => {
  return <div className={s.page}>{children}</div>
}
