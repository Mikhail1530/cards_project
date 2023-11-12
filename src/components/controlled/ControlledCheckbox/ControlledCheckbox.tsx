import Checkbox, { CheckboxProps } from '@/components/ui/Сheckbox/Checkbox.tsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> & // T ext FieldValues give as typization for name in LoginForm.There it comes from scheme.
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'> // (onCheckedChange = onChange, checked = value from useControlled)add omit since we already have these in CheckboxProps, dont want to add it once again

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
    field: { value, onChange, ref }, // useControlled returns an object containing information about the field being controlled
  } = useController({
    control: control, //Control in the useController function is simply connecting the control object created by useForm to the control object used by useController. This linkage ensures that the ControlledCheckbox is associated with the right form and its form state, making it an integral part of the form's controlled inputs.
    shouldUnregister,
    defaultValue,
    rules,
    disabled,
    name: name, // we get from Forms as props, important to match with the useForms<typification>
  })

  return (
    <Checkbox
      checked={value}
      onCheckedChange={onChange}
      ref={ref}
      // onBlur={onBlur}
      {...rest}
      disabled={disabled}
    />
  )
}

export default ControlledCheckbox
