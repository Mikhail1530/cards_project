import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ControlledCheckbox from '@/components/controlled/ControlledCheckbox/ControlledCheckbox.tsx'

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
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} errorMessage={errors.email?.message} label={'email'} />{' '}
      <TextField
        {...register('password')}
        errorMessage={errors.password?.message}
        label={'password'}
      />{' '}
      <ControlledCheckbox
        {...register('rememberMe')}
        label={'Remember me'}
        control={control}
        name={'rememberMe'}
      />{' '}
      <Button type="submit" variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
