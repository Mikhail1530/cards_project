import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeckForm.module.scss'
import { ReactNode } from 'react'
import { ControlledFileUploader } from '@/view/components/shared-controlled/controlledTextField/controlledTextField'

export type AddDeckProps = {
  onSubmit: (data: FormData) => void
  icon?: ReactNode
  // open: boolean
  // onClose: () => void
}

type AddDeckFormValues = z.infer<typeof addDeckForm>

// const MAX_FILE_SIZE = 5000000
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const addDeckForm = z.object({
  // cover: z.instanceof(File).superRefine((f, ctx) => {
  //   if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(', ')}] but was ${f.type}`,
  //     })
  //   }
  //   if (f.size > 3 * MAX_FILE_SIZE) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.too_big,
  //       type: 'array',
  //       message: `The file must not be larger than ${3 * MAX_FILE_SIZE} bytes: ${f.size}`,
  //       maximum: 3 * MAX_FILE_SIZE,
  //       inclusive: true,
  //     })
  //   }
  // }),
  cover: z.any(),
  name: z.string().min(3, 'Too short _selectedDeck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeck = ({ icon, onSubmit }: AddDeckProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addDeckForm),
    defaultValues: { cover: '', name: '', isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    console.log(data)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    onSubmit(formData)
    // onClose()
    console.log(data, 'this is whole formADaata')
    console.log(formData.get('cover'), 'is data in DeckOperationsWindow handleSubmit')
  })

  const onCgange = (val: any) => {
    console.log(val, 'val')
    const formData = new FormData()
    formData.append('cover', val.target.files[0])
  }

  return (
    <Dialog
      className={s.dialog}
      title={'Add New Deck'}
      acceptBtnText={'Add deck'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new deck'}
      icon={icon}
      // open={open}
      // onClose={onClose}
    >
      <form>
        <input type={'file'} {...register('cover')} onChange={onCgange} />
        <div className={s.body}>
          <ControlledFileUploader
            className={s.bodyItem}
            type={'file'}
            control={control}
            name={'cover'}
            label={'Cover'}
            // errorMessage={errors.cover?.message}
          />
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'name'}
            label={'Deck name'}
            errorMessage={errors.name?.message}
          />
          <ControlledCheckbox control={control} name={'isPrivate'} label={'Private deck'} />
        </div>
      </form>
    </Dialog>
  )
}
