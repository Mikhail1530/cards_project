/*We create Controleld TextField just for the semanthics. Since TextField renders input (where we can pass ref directly)
 * we actually don't need additional component of it. */
import { TextField, TextFieldProps } from '@/view/ui/TextField/TextField'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { ChangeEvent, ReactNode } from 'react'

type ControlledTextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  icon?: ReactNode
} & Omit<TextFieldProps, 'value' | 'onChange' | 'ref'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  type,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })

  return <TextField type={type} ref={ref} value={value} onChange={onChange} {...rest} />
}

export const ControlledFileUploader = <T extends FieldValues>({
  control,
  name,
  icon,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })

  //If FileList is empty keep defaulValue of 'cover' as value from useController otherwise
  //change value from useController to Img File
  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!e || !e.target || !e.target.files) return
    console.log(e?.target?.files, 'fileS!!!!')
    onChange(e?.target?.files[0])
  }

  return (
    <TextField
      icon={icon}
      type={'file'}
      ref={ref}
      value={value.filename}
      // value={value.filename || ''}
      onChange={handleOnChange}
      {...rest}
    />
  )
}
