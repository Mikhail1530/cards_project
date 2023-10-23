import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('password')} />
      <Button type="submit" variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
