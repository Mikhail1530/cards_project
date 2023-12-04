import { Button } from '@/view/ui/Button'
import s from './nameChanger.module.scss'
import { ControlledTextField } from '../../../../../ui'
import { useState } from 'react'

export const NameChanger = ({ handleFormSubmit, name, errors, control }: any) => {
  const [disabled, setDisabled] = useState(false)
  const onSubmit = () => {
    setDisabled(true)
    handleFormSubmit()
    setDisabled(false)
  }
  return (
    <>
      <div className={s.nameChanger}>
        <ControlledTextField
          control={control}
          type={'text'}
          errorMessage={errors.nickname?.message}
          label={'Nickname'}
          name={name}
        />
      </div>
      <div className={s.saveChangeNameBtn}>
        <Button onClick={onSubmit} disabled={disabled} type="submit" variant={'primary'}>
          Save changes
        </Button>
      </div>
    </>
  )
}
