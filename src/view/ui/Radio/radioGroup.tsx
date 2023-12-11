import * as RadRadioGroup from '@radix-ui/react-radio-group'
import s from './radioGroup.module.scss'
import { Typography } from '@/view/ui/Typography'
import { ElementRef, forwardRef } from 'react'

export type RadioGroupProps = {
  onValueChange?: () => void
  defaultValue?: string
  className?: string
  disabled?: boolean
  options: Option[]
  value: string
}

type Option = {
  label: string
  value: string
  checked?: boolean
}

export const RadioGroup = forwardRef<ElementRef<typeof RadRadioGroup.Root>, RadioGroupProps>(
  ({ disabled = false, options, value, ...rest }, ref) => {
    return (
      // <form>
      <RadRadioGroup.Root
        className={s.RadioGroupRoot}
        aria-label="View density"
        disabled={disabled}
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
              checked={option.checked}
              {...rest}
            >
              <RadRadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadRadioGroup.Item>
            <Typography as={'label'} className={s.Label} htmlFor={option.value} variant={'body2'}>
              {option.label}
            </Typography>
          </div>
        ))}
      </RadRadioGroup.Root>
      // </form>
    )
  }
)
