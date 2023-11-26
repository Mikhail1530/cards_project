/*We create Controleld TextField just for the semanthics. Since TextField renders input (where we can pass ref directly)
 * we actually don't need additional component of it. */
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { Select } from '@/view/ui'
import { SelectMenuProps } from '@/view/ui/Select'

type ControlledSelectPropsType<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  options: Array<string>
  setQuestionForm: (value: any) => void
} & Omit<SelectMenuProps, 'value' | 'onChangeOption' | 'ref'>

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledSelectPropsType<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })

  const handleOnChange = () => {
    onChange()
  }
  console.log(value, 'value')

  // const handleOnChange = (e: ChangeEvent<HTMLSelectElement> | undefined) => {
  //   if (e && e.target.value === 'image') {
  //     ;<input type={'file'} />
  //   }
  //   onChange(e?.target?.files[0])
  // }
  // console.log(value, 'value')
  return <Select ref={ref} value={value} onChangeOption={handleOnChange} {...rest} />
}
