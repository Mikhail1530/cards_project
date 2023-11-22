import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeckForm.module.scss'
import { ReactNode } from 'react'

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
  name: z.string().min(3, 'Too short selectedDeck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeck = ({ icon, onSubmit }: AddDeckProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addDeckForm),
    defaultValues: { cover: null, name: '', isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    onSubmit(formData)
    // onClose()
    console.log(formData.get('cover'), 'is data in DeckOperationsWindow handleSubmit')
  })

  // const onCgange = (val: any) => {
  //   console.log(val, 'val')
  //   const formData = new FormData()
  //   formData.append('cover', val.target.files[0])
  //   console.log(formData.get('c'))
  // }
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
        {/*<input type={'file'} {...register('cover')} onChange={onCgange} />*/}
        <div className={s.body}>
          <ControlledTextField
            className={s.bodyItem}
            type={'file'}
            control={control}
            name={'cover'}
            label={'Cover'}
            accept={'image/jpeg' || 'image/jpg' || 'image/png' || 'image/webp'}
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
