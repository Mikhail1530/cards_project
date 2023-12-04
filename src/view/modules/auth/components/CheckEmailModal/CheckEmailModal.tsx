import { Button } from '@/view/ui/Button'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './CheckEmailModal.module.scss'
import { EmailIcon } from '@/view/assets'

export const CheckEmailModal = ({ onSubmit }: any) => {
  return (
    <Card className={s.card}>
      <Typography as={'div'} className={s.title} variant={'h1'}>
        Check Email
      </Typography>
      <EmailIcon className={s.icon} />
      <Typography className={s.caption} as={'div'} variant={'body2'}>
        We’ve sent an Email with instructions to <br />
        example@mail.com
      </Typography>
      <Button
        fullWidth={false}
        onClick={onSubmit}
        className={s.button}
        type="submit"
        variant={'primary'}
      >
        Back to Sign In
      </Button>
    </Card>
  )
}
