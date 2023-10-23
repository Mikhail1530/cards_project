import { useController, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import Checkbox from '@/components/ui/Сheckbox/Checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Defines the shape of the form data. Optional but good to use.
type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) }) // formState has errors

  const onSubmit = (data: FormValues) => {
    console.log(data) // we can send data from here, map it do whatever. This is object of data from fulfilled Form.
    // here we receive data that is validated by our rules
  }

  const {
    field: { value, onChange }, // same as we would use useState hook but we don't need it coz of that
  } = useController({ name: 'rememberMe', control, defaultValue: false }) // -> name of checkbox (any other item). DefaultValue changes checkbox from undefined to false
  console.log(errors)

  console.log(register('password'))
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} errorMessage={errors.email?.message} label={'email'} />{' '}
      {/*As second parameter we could provide validation for this field*/}
      <TextField
        {...register('password')}
        errorMessage={errors.password?.message}
        label={'password'}
      />{' '}
      {/*Login form has input field which has place for ref
      But Radix checkbox doesn't accept ref for some reason. Thus we need to use useController */}
      <Checkbox
        checked={value}
        onCheckedChange={onChange}
        {...register('rememberMe')}
        label={'rememberMe'}
      />{' '}
      <Button type="submit" variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
