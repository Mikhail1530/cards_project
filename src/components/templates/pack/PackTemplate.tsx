import { Card, CardProps } from '@/components/ui/Card'
import { Button, ControlledCheckbox, ControlledTextField, Typography } from '@/components/ui'
import s from './PackTemplate.module.scss'
import { Close } from '@/assets'
import { UseControllerProps, useForm } from 'react-hook-form'
import { ElementType } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type PackTemplate<T extends ElementType> = {
  header: string
  packName: string
} & UseControllerProps &
  Omit<CardProps<T>, 'value' | 'onChange' | 'ref'>

type BodyValues = z.infer<typeof packTemplateSchema>

const packTemplateSchema = z.object({
  packName: z.string().min(2, 'Too short pack name').max(25),
  privatePack: z.boolean().optional(),
})

export const PackTemplate = <T extends ElementType>({ header, packName }: PackTemplate<T>) => {
  const {
    control,
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<BodyValues>({
    resolver: zodResolver(packTemplateSchema),
    defaultValues: { packName: packName, privatePack: false },
  })

  const handleFormSubmit = (data: BodyValues) => {
    console.log(data, 'is data in PackTemplate handleSubmit')
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className={s.packContainer}>
        <div className={s.header}>
          <Typography variant={'h2'}>{header}</Typography>
          <Close />
        </div>
        <div className={s.body}>
          <ControlledTextField control={control} {...register} name={'packName'} />
          <ControlledCheckbox control={control} name={'privatePack'} />
        </div>
        <div className={s.footerBtns}>
          <Button fullWidth={false}>Cancel</Button>
          <Button fullWidth={false}>SaveChanges</Button>
        </div>
      </Card>
    </form>
  )
}
