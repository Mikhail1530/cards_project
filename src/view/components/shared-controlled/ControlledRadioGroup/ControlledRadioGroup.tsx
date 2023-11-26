import { useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup } from '../../../ui/Radio'
import { RadioGroupProps } from '@/view/ui/Radio/radioGroup'

type ControlledRadioGroupProps = UseControllerProps &
  Omit<RadioGroupProps, 'value' | 'onChange' | 'ref'>

export const ControlledRadioGroup = ({ control, name, options }: ControlledRadioGroupProps) => {
  const {
    field: { ref, onChange, ...field },
  } = useController({ control: control, name: name })
  return <RadioGroup ref={ref} options={options} onValueChange={onChange} {...field} />
}
