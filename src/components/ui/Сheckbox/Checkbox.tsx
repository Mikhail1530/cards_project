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
  // onBlur?: () => void
  //FIXME: when disabled and checked background doesn't change.
}

//to extract default props from radix: ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props: CheckboxProps, ref) => {
    const { label, className, disabled, ...rest } = props
    const classNames = {
      checkBoxClassName: clsx(
        s.button,
        s.className,
        disabled && s.disabled,
        className && className
      ),
      checkboxLabelClassName: clsx(s.Label, disabled && s.disabled),
      checkboxContainer: clsx(s.checkboxContainer, className && s.className),
    }

    return (
      <div className={classNames['checkboxContainer']}>
        <CheckboxRadix.Root
          ref={ref}
          className={classNames['checkBoxClassName']}
          disabled={disabled}
          id="c1"
          {...rest}
        >
          <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
            <CheckIcon />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <label className={classNames['checkboxLabelClassName']} htmlFor="c1">
          {label}
        </label>
      </div>
    )
  }
)
