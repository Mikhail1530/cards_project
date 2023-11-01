import { useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup } from '@/components/ui/radio'
import { RadioGroupProps } from '@/components/ui/radio/radioGroupProps'

type ControlledRadioGroupProps = UseControllerProps &
  Omit<RadioGroupProps, 'value' | 'onChange' | 'ref'>

const ControlledRadioGroup = ({ control, name, options }: ControlledRadioGroupProps) => {
  const {
    field: { ref },
  } = useController({ control: control, name: name })
  return <RadioGroup ref={ref} options={options} />
}

export default ControlledRadioGroup
