import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import s from './Checkbox.module.scss'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { clsx } from 'clsx'

export type CheckboxProps<T extends ElementType> = {
  title?: string
  label?: string
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  className?: string
  disabled?: boolean
  //FIXME: when disabled and checked background doesn't change.
} & ComponentPropsWithoutRef<T>

const Checkbox = <T extends ElementType = 'button'>(props: CheckboxProps<T>) => {
  const { label, className, disabled, ...rest } = props
  const checkBoxClassName = clsx(s.button, s.className, disabled && s.disabled)
  const checkboxLabelClassName = clsx(s.Label, disabled && s.disabled)

  return (
    <div className={s.checkboxContainer}>
      <CheckboxRadix.Root className={checkBoxClassName} disabled={disabled} id="c1" {...rest}>
        <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <label className={checkboxLabelClassName} htmlFor="c1">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
