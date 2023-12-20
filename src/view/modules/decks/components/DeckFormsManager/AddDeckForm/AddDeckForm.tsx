import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeckForm.module.scss'
import { ReactNode } from 'react'
import { ControlledFileUploader } from '@/view/components/shared-controlled/ControlledFileUploader/ControlledFileUploader'
import { useSelector } from 'react-redux'
import { coverImagePreviewSelector } from '@/view/modules/decks/slice/DecksSlice'

export type AddDeckProps = {
  onSubmit: (data: FormData) => void
  icon?: ReactNode
  open: boolean
  onClose: () => void
}

type AddDeckFormValues = z.infer<typeof addDeckForm>

const addDeckForm = z.object({
  cover: z.any(),
  name: z.string().min(3, 'Too short deck name. It should be at least 3 symbols.').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeckForm = ({ icon, onSubmit, open, onClose }: AddDeckProps) => {
  const coverImagePreview = useSelector(coverImagePreviewSelector)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addDeckForm),
    defaultValues: { cover: '', name: '', isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    onSubmit(formData)
    onClose()
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Add New Deck'}
      acceptBtnText={'Add deck'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new deck'}
      icon={icon}
      open={open}
      onClose={onClose}
    >
      <form>
        <div className={s.body}>
          {coverImagePreview && <img src={coverImagePreview} alt={'Cover preview image'} />}
          <ControlledFileUploader
            className={s.bodyItem}
            control={control}
            name={'cover'}
            label={'Cover'}
            fileInputLabelText={coverImagePreview ? 'Change cover' : 'Add cover'}
            imagePreviewType={'cover'}
          />
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'name'}
            label={'Deck name'}
            errorMessage={errors.name?.message}
          />
          <ControlledCheckbox
            className={s.addDeckCheckbox}
            control={control}
            name={'isPrivate'}
            label={'Private deck'}
          />
        </div>
      </form>
    </Dialog>
  )
}
