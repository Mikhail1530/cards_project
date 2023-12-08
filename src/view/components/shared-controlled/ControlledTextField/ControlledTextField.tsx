/*We create Controleld TextField just for the semanthics. Since TextField renders input (where we can pass ref directly)
 * we actually don't need additional component of it. */
import { TextField, TextFieldProps } from '@/view/ui/TextField/TextField'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { ReactNode } from 'react'

type ControlledTextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  icon?: ReactNode
} & Omit<TextFieldProps, 'value' | 'onChange' | 'ref'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  type = 'text',
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })

  return <TextField type={type} ref={ref} value={value} onChange={onChange} {...rest} />
}
