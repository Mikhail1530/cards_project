import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Typography } from '@/components/ui'
import s from './PersonalInformationForm.module.scss'
import { useState } from 'react'
import { AvatarWithEditButton, NameWithEditButton, NameChanger } from '..'

type FormValues = z.infer<typeof personalInformationSchema>

const personalInformationSchema = z.object({
  nickname: z.string().min(2, 'Too short nickname').max(25),
})

type PersonalInformationFormProps = {
  onSubmit: () => void
  nickname: string
  email: string
  avatar: string
  changeAvatar: () => void
  saveChangedName: () => void
  changeName: () => void
}

export const PersonalInformationForm = ({
  avatar,
  onSubmit,
  nickname,
  email,
  changeAvatar,
}: PersonalInformationFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { nickname: nickname },
  })

  const [isNameEditing, setIsNameEditing] = useState(false)

  const handleAvatarChange = () => {
    changeAvatar()
  }

  const openNameEditing = () => {
    setIsNameEditing(!isNameEditing)
  }

  const handleFormSubmit = (data: FormValues) => {
    setIsNameEditing(false)
    onSubmit()
    console.log(data, 'personalInformation submit form data')
  }

  return (
    <Card as={'form'} onSubmit={handleSubmit(handleFormSubmit)} className={s.form}>
      <Typography as={'div'} className={s.caption} variant={'h1'}>
        Personal information
      </Typography>

      <AvatarWithEditButton avatar={avatar} handleAvatarChange={handleAvatarChange} />

      {!isNameEditing ? (
        <NameWithEditButton openNameEditing={openNameEditing} email={email} nickname={nickname} />
      ) : (
        <NameChanger control={control} register={register} errors={errors} />
      )}
    </Card>
  )
}
