import { useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup } from '@/view/ui/radio'
import { RadioGroupProps } from '@/view/ui/radio/radioGroup'

type ControlledRadioGroupProps = UseControllerProps &
  Omit<RadioGroupProps, 'value' | 'onChange' | 'ref'>

export const ControlledRadioGroup = ({ control, name, options }: ControlledRadioGroupProps) => {
  const {
    field: { ref, onChange, ...field },
  } = useController({ control: control, name: name })
  return <RadioGroup ref={ref} options={options} onValueChange={onChange} {...field} />
}
