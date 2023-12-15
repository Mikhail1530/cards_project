import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { ChangeEvent, ReactNode } from 'react'
import { TextFieldProps } from '@/view/ui/TextField/TextField'
import { FileUploader } from '@/view/ui/FileUploader/FileUploader'

type ControlledTextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  icon?: ReactNode
} & Omit<TextFieldProps, 'value' | 'onChange' | 'ref'>

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
    onChange(e?.target?.files[0])
  }

  return (
    <FileUploader
      icon={icon}
      ref={ref}
      value={value.filename}
      name={name}
      onChange={handleOnChange}
      {...rest}
    />
  )
}
