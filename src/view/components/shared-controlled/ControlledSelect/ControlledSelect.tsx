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

  return <Select ref={ref} value={value} onChangeOption={onChange} {...rest} />
}
