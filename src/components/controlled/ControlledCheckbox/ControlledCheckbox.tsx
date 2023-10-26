import Checkbox, { CheckboxProps } from '@/components/ui/Сheckbox/Checkbox.tsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> & // T ext FieldValues give as typization for name in LoginForm.There it comes from scheme.
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
    field: { value, onChange, ref }, // onBlur useControlled returns an object containing information about the field being controlled
  } = useController({
    control: control, // we get from Forms as props, all between we extract from UseControllerProps <----- ASK ANDREI about that
    shouldUnregister,
    defaultValue,
    rules,
    disabled,
    name: name, // we get from Forms as props
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
