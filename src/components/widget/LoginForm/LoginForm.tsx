import { useController, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import Checkbox from '@/components/ui/Сheckbox/Checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Defines the shape of the form data. Optional but good to use.
// type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// }
// we can replace this with:
type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, 'Too short password').max(25),
  rememberMe: z.boolean().optional(),
})

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  }) // -> this is equal to type Typescripts: User = {name:string} ----> type PartialUser = Partial<User>
  // formState has errors, zod by default adds "required" to all fields.
  // If field is "undefined" e.g Checkbox and not false/true, we cannot send the form. So need to add default values which should be empty values ((string,false etc)

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
