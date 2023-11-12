import { useState } from 'react'

import { ArrowDownOutline } from '@/assets/icons/arrows/Arrow-down'
import * as RSelect from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'

import s from './Select.module.scss'

export type SelectMenuProps = {
  onChangeOption: (value: number) => void
  options: string[]
  placeholder?: string
  title?: string
} & SelectProps

export const Select = ({
  onChangeOption,
  options,
  placeholder = options[0],
  title,
  ...rest
}: SelectMenuProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const onChangeCallback = (value: string) => {
    onChangeOption && onChangeOption(Number(value))
  }

  const toggleIsOpened = () => {
    setIsOpened(!isOpened)
  }
  const mappedOptions = options.map((el, id) => (
    <RSelect.Item className={s.item} key={id} value={el}>
      <RSelect.ItemText>{el}</RSelect.ItemText>
      <RSelect.ItemIndicator className={s.selected} />
    </RSelect.Item>
  ))

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>
      <RSelect.Root onOpenChange={toggleIsOpened} onValueChange={onChangeCallback} {...rest}>
        <RSelect.Trigger className={s.trigger}>
          <RSelect.Value placeholder={placeholder} />
          <RSelect.Icon>
            <ArrowDownOutline className={isOpened ? s.iconRotated : s.icon} />
          </RSelect.Icon>
        </RSelect.Trigger>

        <RSelect.Portal>
          <RSelect.Content
            align={'start'}
            className={s.selectContent}
            collisionPadding={0}
            position={'popper'}
            side={'top'}
          >
            <RSelect.Viewport className={s.viewport}>{mappedOptions}</RSelect.Viewport>
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root>
    </div>
  )
}
