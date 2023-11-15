import { Button } from '@/view/ui/Button'
import s from './nameChanger.module.scss'
import { ControlledTextField } from '../../../../ui'

export const NameChanger = ({ control, register, errors }: any) => {
  return (
    <>
      <div className={s.nameChanger}>
        <ControlledTextField
          control={control}
          type={'text'}
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
          label={'Nickname'}
        />
      </div>
      <div className={s.saveChangeNameBtn}>
        <Button type="submit" variant={'primary'}>
          Save changes
        </Button>
      </div>
      {/*  TODO: When you click on the button outline appears. Should be removed*/}
    </>
  )
}
