import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Typography } from '@/view/ui'
import s from './PersonalInformationForm.module.scss'
import { ReactNode, useState } from 'react'
import { AvatarWithEditButton, NameChanger, NameWithEditButton } from '../index'

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
  icon?: ReactNode
  onClose: () => void
  open: boolean
}

export const PersonalInformationForm = ({
  avatar,
  onSubmit,
  nickname,
  email,
  changeAvatar,
  icon,
  onClose,
  open,
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

  const handleFormSubmit = handleSubmit((data: FormValues) => {
    setIsNameEditing(false)
    onSubmit()
    console.log(data, 'personalInformation submit form data')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'My profile'}
      acceptBtnText={'My profile'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'My profile'}
      icon={icon}
      open={open}
      onClose={onClose}
      triggerBtnVariant={'link'}
    >
      <form>
        <div className={s.body}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Personal information
          </Typography>

          <AvatarWithEditButton avatar={avatar} handleAvatarChange={handleAvatarChange} />

          {!isNameEditing ? (
            <NameWithEditButton
              openNameEditing={openNameEditing}
              email={email}
              nickname={nickname}
            />
          ) : (
            <NameChanger control={control} register={register} errors={errors} />
          )}
        </div>
      </form>
    </Dialog>
  )
}
