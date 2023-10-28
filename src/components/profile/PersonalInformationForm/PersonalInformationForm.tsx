import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Typography } from '../../ui/Typography'
import s from './PersonalInformationForm.module.scss'
import EditPencil from '@/assets/icons/editPencil/EditPencil.tsx'
import Logout from '@/assets/icons/log-out/Logout.tsx'
import { useState } from 'react'

type FormValues = z.infer<typeof personalInformationSchema>

const personalInformationSchema = z.object({
  name: z.string().min(2, 'Too short nickname').max(25),
})

type PersonalInformationFormProps = {
  onSubmit: (data: FormValues) => void
  name: string
  email: string
  avatar: string
  changeAvatar: () => void
  saveChangedName: () => void
  changeName: () => void
}

export const PersonalInformationForm = ({
  avatar,
  onSubmit,
  name,
  email,
  changeAvatar,
  saveChangedName,
  changeName,
}: PersonalInformationFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { name: '' },
  })

  const [isNameEditing, setIsNameEditing] = useState(false)

  const handleSaveChangedName = () => {
    setIsNameEditing(false)
    saveChangedName()
  }

  const handleAvatarChange = () => {
    changeAvatar()
  }

  const handleEditName = () => {
    setIsNameEditing(!isNameEditing)
    changeName()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Personal information
          </Typography>
          <div className={s.form}>
            <div className={s.avatarContainer}>
              <Avatar
                isNameEditing={isNameEditing}
                avatar={avatar}
                handleAvatarChange={handleAvatarChange}
                register={register}
                errors={errors}
              />
            </div>
            <NameSection
              isNameEditing={isNameEditing}
              name={name}
              handleEditName={handleEditName}
              email={email}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            {isNameEditing ? (
              <Button
                onClick={handleSaveChangedName}
                className={s.but}
                type="submit"
                variant={'primary'}
              >
                Save changes
              </Button>
            ) : (
              <Button icon={<Logout />} className={s.button_save_logout} variant={'secondary'}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </Card>
    </form>
  )
}

const Avatar = ({ isNameEditing, avatar, handleAvatarChange, register, errors }: any) => (
  <div className={s.avatar}>
    <img src={avatar} alt={'avatar'}></img>
    {isNameEditing ? (
      <TextField {...register('name')} errorMessage={errors.name?.message} label={'Nickname'} />
    ) : (
      <Button
        onClick={handleAvatarChange}
        className={s.avatarEditButton}
        icon={<EditPencil />}
        variant={'secondary'}
      ></Button>
    )}
  </div>
)
const NameSection = ({ isNameEditing, name, handleEditName, email }: any) => (
  <div className={s.nameWithEditButtonContainer}>
    {isNameEditing ? (
      ''
    ) : (
      <>
        <div className={s.nameWithEditButton}>
          <Typography as={'div'} className={s.name} variant={'h1'}>
            {name}
          </Typography>
          <Button
            onClick={handleEditName}
            className={s.editNameButton}
            icon={<EditPencil />}
            variant={'secondary'}
          ></Button>
        </div>
        <div>
          <Typography as={'div'} className={s.email} variant={'body2'}>
            {email}
          </Typography>
        </div>
      </>
    )}
  </div>
)
