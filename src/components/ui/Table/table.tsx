import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import s from './table.module.scss'

export const THead = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      thead: clsx(className, s.thead),
    }
    return <thead className={classNames.thead} {...rest} ref={ref}></thead>
  }
)

export const TBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      thead: clsx(className, s.tbody),
    }
    return <tbody className={classNames.thead} {...rest} ref={ref}></tbody>
  }
)

export const TRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tr: clsx(className, s.tr),
    }
    return <tr className={classNames.tr} {...rest} ref={ref}></tr>
  }
)

export const THeader = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const classNames = { th: clsx(className, s.th) }
    return <th className={classNames.th} {...rest} ref={ref}></th>
  }
)

export const TCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = { td: clsx(className, s.td) }
    return <td className={classNames.td} {...rest} ref={ref}></td>
  }
)

const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      table: clsx(className, s.table),
    }

    return <table className={classNames['table']} {...rest} ref={ref}></table>
  }
)

export default Table

// The forwardRef function allows you to expose
// the ref prop so that parent components can pass
// a ref to the Table component and have it apply that
// ref to the underlying <table> element.
// If you don't use forwardRef and simply expect a ref
// as a regular prop, it won't work in the same way
// because React won't automatically forward the ref
// to the DOM element.

// ComponentPropsWithoutRef<'table'>
// is used to define the allowed props for the Table component,
