import { FieldValues, UseControllerProps } from 'react-hook-form'
import { Button, ButtonProps, ButtonVariants } from '@/components/ui/Button'
import { ReactNode } from 'react'

type ControlledButtonProps<T extends FieldValues> = {
  // sjuda prihodit minimum object tipa FieldValues и мы его расширяем Т
  control: UseControllerProps<T>
  variant: ButtonVariants
  children: string | ReactNode
} & ButtonProps<'button'>

const ControlledButton = <D extends FieldValues>(props: ControlledButtonProps<D>) => {
  const { name, disabled, variant, children, ...rest } = props
  return (
    <Button variant={variant} {...rest} name={name}>
      {' '}
      {children}
    </Button>
  )
}

export default ControlledButton
