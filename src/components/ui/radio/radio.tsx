import * as RadRadioGroup from '@radix-ui/react-radio-group'
import s from './radio.module.scss'
import { Typography } from '@/components/ui/Typography'

type RadioGroup = {
  onValueChange?: () => void
  defaultValue?: string
  className?: string
  disabled: boolean
  options: Option[]
}

type Option = {
  label: string
  value: string
}

export const RadioGroup = ({ disabled, options, ...rest }: RadioGroup) => {
  return (
    <form>
      <RadRadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue="default"
        aria-label="View density"
        disabled={disabled}
        {...rest}
      >
        {options.map(option => (
          <div className={s.radioItemsContainer} key={option.value}>
            <RadRadioGroup.Item
              className={s.RadioGroupItem}
              value="default"
              id={option.value}
              disabled={disabled}
            >
              <RadRadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadRadioGroup.Item>
            <Typography as={'label'} className={s.Label} htmlFor={option.value} variant={'body2'}>
              {option.label}
            </Typography>
          </div>
        ))}
      </RadRadioGroup.Root>
    </form>
  )
}
