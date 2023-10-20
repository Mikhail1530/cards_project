import { useState } from 'react'

import { ArrowDownOutline } from '@/assets/icons/arrows/arrow-ios-Down-outline'
import * as Select from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'

import s from './Select.module.scss'

export type SelectMenuProps = {
  onChangeOption: (value: string) => void
  options: string[]
  placeholder?: string
  title?: string
} & SelectProps

export const SelectMenu = ({
  onChangeOption,
  options,
  placeholder = options[0],
  title,
  ...rest
}: SelectMenuProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const onChangeCallback = (value: string) => {
    onChangeOption && onChangeOption(value)
  }

  const toggleIsOpened = () => {
    setIsOpened(!isOpened)
  }

  const mappedOptions = options.map((el, id) => (
    <Select.Item className={s.item} key={id} value={el}>
      <Select.ItemText>{el}</Select.ItemText>
      <Select.ItemIndicator className={s.selected} />
    </Select.Item>
  ))

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>
      <Select.Root onOpenChange={toggleIsOpened} onValueChange={onChangeCallback} {...rest}>
        <Select.Trigger className={s.trigger}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ArrowDownOutline className={isOpened ? s.iconRotated : s.icon} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            align={'start'}
            className={s.selectContent}
            collisionPadding={0}
            position={'popper'}
            side={'top'}
          >
            <Select.Viewport className={s.viewport}>{mappedOptions}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
