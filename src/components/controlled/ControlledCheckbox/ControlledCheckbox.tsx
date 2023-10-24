import Checkbox, { CheckboxProps } from '@/components/ui/Сheckbox/Checkbox.tsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'> // add omit since we already have these in CheckboxProps, dont want to add it once again

// TODO: ideally to add forward ref and pass it to Root component of each element.

const ControlledCheckbox = <T extends FieldValues>({
  control,
  shouldUnregister,
  defaultValue,
  rules,
  disabled,
  name,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange, ref }, // onBlur
  } = useController({
    control,
    shouldUnregister,
    defaultValue,
    rules,
    disabled,
    name,
  })

  return (
    <Checkbox
      checked={value}
      onCheckedChange={onChange}
      ref={ref}
      // onBlur={onBlur as () => void}
      {...rest}
      disabled={disabled}
    />
  )
}

export default ControlledCheckbox
