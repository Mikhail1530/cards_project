import s from './FilterWidgetSkeleton.module.scss'

export const FilterWidgetSkeleton = () => {
  return (
    <div className={s.filterWidgetSkeleton}>
      <div className={s.line}></div>
    </div>
  )
}
