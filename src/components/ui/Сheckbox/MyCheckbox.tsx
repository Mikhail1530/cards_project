import { ComponentPropsWithoutRef, ElementType } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './MyCheckbox.module.scss'

export type MyCheckboxProps<T extends ElementType> = {
  as?: T
  checked: boolean
  className: string
  label: string
  onChange: () => void
  title?: string
} & ComponentPropsWithoutRef<T>

const MyCheckbox = <T extends ElementType = 'button'>(props: MyCheckboxProps<T>) => {
  const { as: Component = 'button', checked, className, label, onChange, title, ...rest } = props

  return (
    <form>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <Checkbox.Root
          checked={checked}
          className={s.className}
          defaultChecked
          id={'c1'}
          onChangeChange={onChange}
          {...rest}
          title={title}
        >
          <Checkbox.Indicator className={s.CheckboxIndicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className={s.Label} htmlFor={'c1'}>
          {label}
        </label>
      </div>
    </form>
  )
}

export default MyCheckbox
