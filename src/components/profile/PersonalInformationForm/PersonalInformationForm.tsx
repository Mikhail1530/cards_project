import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Typography } from '../../ui/Typography'
import s from './PersonalInformationForm.module.scss'
import { clsx } from 'clsx'
import Eye from '@/assets/icons/eye/Eye.tsx'
import EditPencil from '@/assets/icons/editPencil/EditPencil.tsx'
import Logout from '@/assets/icons/log-out/Logout.tsx'

type FormValues = z.infer<typeof personalInformationSchema>

const personalInformationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, 'Too short password').max(25),
  rememberMe: z.boolean().optional(),
})

type PersonalInformationFormProps = {
  onSubmit: (data: FormValues) => void
  name: string
}

export const PersonalInformationForm = ({
  onSubmit,
  name = 'bob',
}: PersonalInformationFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  // const classNames = {
  //   button_saveChanges: clsx(button_saveChanges),
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Personal information
          </Typography>
          <div className={s.form}>
            <div className={s.avatarContainer}>
              <div className={s.avatar}>
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRTYbYaWZbc9r4KKdclIUiwO6JRrHgSpRQjB7RTA&s'
                  }
                  alt={''}
                ></img>
                <Button
                  className={s.avatarEditButton}
                  icon={<EditPencil />}
                  variant={'secondary'}
                ></Button>
              </div>
            </div>
            <div className={s.nameWithEditButton}>
              <Typography as={'div'} className={s.name} variant={'h1'}>
                {name}
              </Typography>
              <Button
                className={s.editNameButton}
                icon={<EditPencil />}
                variant={'secondary'}
              ></Button>
            </div>

            <TextField
              {...register('email')}
              errorMessage={errors.email?.message}
              label={'Email'}
            />
          </div>
          <div>
            <Button className={s.but} type="submit" variant={'primary'}>
              Save changes
            </Button>
            <Button icon={<Logout />} className={s.button_save_logout} variant={'secondary'}>
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
