import * as RadRadioGroup from '@radix-ui/react-radio-group'
import s from './radioGroup.module.scss'
import { Typography } from '@/view/ui/Typography'
import { ElementRef, forwardRef } from 'react'
import { clsx } from 'clsx'

export type RadioGroupProps = {
  onValueChange?: () => void
  defaultValue?: string
  className?: string
  disabled?: boolean
  options: Option[]
  value: string
  errorMessage?: string
}

type Option = {
  label: string
  value: string
  checked?: boolean
}

export const RadioGroup = forwardRef<ElementRef<typeof RadRadioGroup.Root>, RadioGroupProps>(
  ({ disabled = false, options, value, onValueChange, errorMessage, className, ...rest }, ref) => {
    const classNames = {
      error: clsx(s.error, className && className),
    }

    return (
      // <form>
      <RadRadioGroup.Root
        className={s.RadioGroupRoot}
        aria-label="View density"
        disabled={disabled}
        onValueChange={onValueChange}
        required={true}
        {...rest}
        ref={ref}
      >
        {options.map(option => (
          <div className={s.radioItemsContainer} key={option.value}>
            <RadRadioGroup.Item
              className={s.RadioGroupItem}
              value={option.value}
              id={option.value}
              disabled={disabled}
              required={true}
              // checked={option.checked}
              {...rest}
            >
              <RadRadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadRadioGroup.Item>
            <Typography as={'label'} className={s.Label} htmlFor={option.value} variant={'body2'}>
              {option.label}
            </Typography>
          </div>
        ))}
        <>
          <Typography className={classNames.error}>{errorMessage}</Typography>
        </>
      </RadRadioGroup.Root>
      // </form>
    )
  }
)
