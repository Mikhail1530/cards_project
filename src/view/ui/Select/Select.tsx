import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode, useState } from 'react'

import { ArrowDownOutline } from '@/view/assets/icons/arrows/Arrow-down'
import * as RSelect from '@radix-ui/react-select'

import s from './Select.module.scss'
import { clsx } from 'clsx'

export type SelectMenuProps = {
  onChangeOption: (value: string) => void
  options: string[]
  placeholder?: string
  title?: string
  itemsPerPage?: number
  value?: string
  icon?: ReactNode
  setQuestionForm?: (value: string) => void
  className?: string
} & ComponentPropsWithoutRef<typeof RSelect.Root>

export const Select = forwardRef<ElementRef<typeof RSelect.Root>, SelectMenuProps>(
  (
    {
      onChangeOption,
      options,
      placeholder = options[0],
      title,
      itemsPerPage,
      setQuestionForm,
      icon,
      className,
      ...rest
    }: SelectMenuProps,
    ref
  ) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const onChangeCallback = (value: string) => {
      setQuestionForm?.(value)
      onChangeOption && onChangeOption(value)
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

    const classNames = {
      trigger: clsx(s.trigger, className),
    }

    return (
      <div className={s.wrapper}>
        <div className={s.title}>{title}</div>
        <RSelect.Root
          onOpenChange={toggleIsOpened}
          onValueChange={onChangeCallback}
          {...rest}
          // ref={ref}
        >
          <RSelect.Trigger ref={ref} className={classNames['trigger']}>
            <RSelect.Value placeholder={'text'} />
            <RSelect.Icon>
              {icon || <ArrowDownOutline className={isOpened ? s.iconRotated : s.icon} />}
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
)
