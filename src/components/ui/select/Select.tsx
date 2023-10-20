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
  const onChangeCallback = (value: string) => {
    onChangeOption && onChangeOption(value)
  }

  const mappedOptions = options.map((el, id) => (
    <Select.Item className={s.item} key={id} value={el}>
      <Select.ItemText>{el}</Select.ItemText>
      <Select.ItemIndicator className={s.selected} />
    </Select.Item>
  ))

  //     <Select.Group>
  //     <Select.Label />
  //     <Select.Item>
  //     <Select.ItemText />
  //     <Select.ItemIndicator />
  //     </Select.Item>
  // </Select.Group>

  return (
    <div className={s.wrapper}>
      <Select.Root onValueChange={onChangeCallback} {...rest}>
        <Select.Trigger className={s.trigger}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            align={'start'}
            className={s.selectContent}
            collisionPadding={0}
            position={'popper'}
            side={'top'}
            sideOffset={-5}
          >
            <Select.Viewport className={s.viewport}>{mappedOptions}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
