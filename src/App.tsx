import { MyButton } from '@/components/ui/Button'
import MyCheckbox from '@/components/ui/Сheckbox/MyCheckbox'

export function App() {
  return (
    <div>
      <MyCheckbox checked className={''} label={'checkbox'} onChange={() => {}}>
        checkxobx
      </MyCheckbox>
      <MyButton className={'kakoito'} variant={'link'}>
        text
      </MyButton>
      <MyButton variant={'primary'}>text</MyButton>
      <MyButton variant={'secondary'}>text</MyButton>
      <MyButton variant={'tertiary'}>text</MyButton>
    </div>
  )
}
