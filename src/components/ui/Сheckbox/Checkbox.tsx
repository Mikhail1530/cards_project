import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import s from './Checkbox.module.scss'
import { clsx } from 'clsx'
import { ElementRef, forwardRef } from 'react'

export type CheckboxProps = {
  title?: string
  label?: string
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  className?: string
  disabled?: boolean
  onBlur?: () => void
  //FIXME: when disabled and checked background doesn't change.
}

//to extract default props from radix: ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props: CheckboxProps, ref) => {
    const { label, className, disabled, ...rest } = props
    const checkBoxClassName = clsx(s.button, s.className, disabled && s.disabled)
    const checkboxLabelClassName = clsx(s.Label, disabled && s.disabled)

    return (
      <div className={s.checkboxContainer}>
        <CheckboxRadix.Root
          ref={ref}
          className={checkBoxClassName}
          disabled={disabled}
          id="c1"
          {...rest}
        >
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
)

export default Checkbox
