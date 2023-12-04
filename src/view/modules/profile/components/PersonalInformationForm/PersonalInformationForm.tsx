import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Typography } from '@/view/ui'
import s from './PersonalInformationForm.module.scss'
import { ReactNode, useState } from 'react'
import { NameChanger, NameWithEditButton } from '../index'
import { EditPencil } from '@/view/assets'
import { ControlledFileUploader } from '@/view/components/shared-controlled/ControlledTextField/ControlledTextField'

export type PersonalInformationFormValues = z.infer<typeof personalInformationSchema>

const personalInformationSchema = z.object({
  name: z.string().min(2, 'Too short nickname').max(25),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  avatar: z.any().optional(),
})

type PersonalInformationFormProps = {
  onSubmit: (data: FormData) => void
  nickname: string
  email: string
  avatar: string
  // changeAvatar: (formData: FormData) => any
  icon?: ReactNode
  onClose: () => void
  open: boolean
  logout: () => void
}

export const PersonalInformationForm = ({
  avatar,
  onSubmit,
  nickname,
  email,
  icon,
  onClose,
  open,
  logout,
}: PersonalInformationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { name: nickname, email: email, avatar: '' },
  })

  const [isNameEditing, setIsNameEditing] = useState(false)

  const openNameEditing = () => {
    setIsNameEditing(!isNameEditing)
  }

  const handleFormSubmit = handleSubmit((data: PersonalInformationFormValues) => {
    setIsNameEditing(false)
    const formData = new FormData()
    // if default value of data wasn't changed don't append to formData
    if (data.avatar && avatar !== data.avatar) {
      formData.append('avatar', data.avatar)
    }
    formData.append('name', data.name)
    formData.append('email', data.email)
    onSubmit(formData)
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
      headerFooterNeeded={false}
    >
      <form>
        <div className={s.body}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Personal information
          </Typography>

          {!isNameEditing ? (
            <>
              <div className={s.avatarContainer}>
                <div className={s.avatar}>
                  <img src={avatar} alt={'avatar'}></img>
                </div>
              </div>
              <NameWithEditButton
                openNameEditing={openNameEditing}
                email={email}
                nickname={nickname}
                logout={logout}
              />
            </>
          ) : (
            <>
              <div className={s.avatarContainer}>
                <div className={s.avatar}>
                  <img src={avatar} alt={'avatar'}></img>
                  <ControlledFileUploader
                    type={'file'}
                    className={s.avatarEditButton}
                    name={'avatar'}
                    icon={<EditPencil />}
                    control={control}
                    onClick={() => setIsNameEditing(true)}
                    // onChange={handleFormSubmit}
                  />
                </div>
              </div>
              <NameChanger
                handleFormSubmit={handleFormSubmit}
                control={control}
                name={'name'}
                errors={errors}
              />
            </>
          )}
        </div>
      </form>
    </Dialog>
  )
}
