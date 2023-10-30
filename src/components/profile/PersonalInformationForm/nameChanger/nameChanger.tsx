import { Button } from '@/components/ui/Button'
import s from './nameChanger.module.scss'
import { ControlledTextField } from '@/components/controlled/controlledTextField/controlledTextField.tsx'

export const NameChanger = ({ control, register, errors, handleInputChange, value }: any) => {
  return (
    <>
      <div className={s.nameChanger}>
        <ControlledTextField
          control={control}
          type={'text'}
          {...register('nickname')}
          // value={value}
          errorMessage={errors.name?.message}
          label={'Nickname'}
          // onChange={handleInputChange}
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
