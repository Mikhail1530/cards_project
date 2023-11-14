/*We create Controleld TextField just for the semanthics. Since TextField renders input (where we can pass ref directly)
 * we actually don't need additional component of it. */
import { TextField, TextFieldProps } from '@/components/ui/TextField/TextField'
import { useController, UseControllerProps } from 'react-hook-form'

type ControlledTextFieldProps = UseControllerProps &
  Omit<TextFieldProps, 'value' | 'onChange' | 'ref'>

export const ControlledTextField = ({ control, name, type, ...rest }: ControlledTextFieldProps) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })

  return <TextField type={type} ref={ref} value={value} onValueChange={onChange} {...rest} />
}
