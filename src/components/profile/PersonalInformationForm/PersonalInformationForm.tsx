import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Typography } from '../../ui/Typography'
import s from './PersonalInformationForm.module.scss'
import EditPencil from '@/assets/icons/editPencil/EditPencil.tsx'
import { ChangeEvent, useState } from 'react'
import { NameWithEditButton } from './nameWithEditButton'
import { NameChanger } from './nameChanger'

type FormValues = z.infer<typeof personalInformationSchema>

const personalInformationSchema = z.object({
  nickname: z.string().min(1, 'Too short nickname').max(25),
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
  const [nameChangerInputValue, setNameChangeInputValue] = useState(nickname)

  const handleAvatarChange = () => {
    changeAvatar()
  }

  const openNameEditing = () => {
    setIsNameEditing(!isNameEditing)
  }

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameChangeInputValue(event.target.value)
  }

  const handleFormSubmit = (data: FormValues) => {
    setIsNameEditing(false)
    onSubmit()
    console.log(data, 'personalInformation submit form data')
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Personal information
          </Typography>
          <div className={s.form}>
            <div className={s.avatarContainer}>
              <div className={s.avatar}>
                <img src={avatar} alt={'avatar'}></img>
                {!isNameEditing && (
                  <Button
                    onClick={handleAvatarChange}
                    className={s.avatarEditButton}
                    icon={<EditPencil />}
                    variant={'secondary'}
                  ></Button>
                )}
              </div>
            </div>
            {!isNameEditing ? (
              <NameWithEditButton
                openNameEditing={openNameEditing}
                email={email}
                nickname={nickname}
              />
            ) : (
              <NameChanger
                control={control}
                register={register}
                errors={errors}
                // handleInputChange={handleNameInputChange}
                // value={nameChangerInputValue}
              />
            )}
          </div>
        </div>
      </Card>
    </form>
  )
}
