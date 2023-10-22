import { ComponentPropsWithoutRef, ElementType } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './MyCheckbox.module.scss'

export type MyCheckboxProps<T extends ElementType> = {
  as?: T
  title?: string
  label?: string
  onChange?: () => void
  checked?: boolean
  className?: string
  //todo disabled, pointer remove
} & ComponentPropsWithoutRef<T>
    
const MyCheckbox = <T extends ElementType = 'button'>(props: MyCheckboxProps<T>) => {
  const { as: Component = 'button', checked, className, label, onChange, title, ...rest } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}> // todo get rid off
      <Checkbox.Root checked={checked} onChangeChange={onChange} className={s.className} defaultChecked id="c1" {...rest} title={title}>
        <Checkbox.Indicator className={s.CheckboxIndicator}>
          <CheckIcon/>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className={s.Label} htmlFor="c1">
        {label}
      </label>
    </div>
  )
}

export default MyCheckbox
