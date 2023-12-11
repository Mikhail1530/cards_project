import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import s from './DropDownMenu.module.scss'
import { Typography } from '@/view/ui'

export type DropDownMenuPropsType = {
  triggerIcon: ReactNode
  icons: ReactNode[]
  itemsToGenerate: string[]
}

export const DropdownMenu = ({ icons, itemsToGenerate, triggerIcon }: DropDownMenuPropsType) => {
  return (
    <RDropdownMenu.Root>
      <RDropdownMenu.Trigger asChild>
        <button className={s.IconButton} aria-label="Customise options">
          {triggerIcon}
        </button>
      </RDropdownMenu.Trigger>

      <RDropdownMenu.Portal>
        <RDropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          {GenerateDropDownMenuItemWithSeparator(itemsToGenerate, icons)}
        </RDropdownMenu.Content>
      </RDropdownMenu.Portal>
    </RDropdownMenu.Root>
  )
}

const GenerateDropDownMenuItemWithSeparator = (itemsNames: string[], icons: ReactNode[]) => {
  return itemsNames.map((itemName, index) => (
    <>
      <RDropdownMenu.Item className={s.DropdownMenuItem}>
        {icons[index]}
        <Typography>{itemName}</Typography>
      </RDropdownMenu.Item>
      {index === itemsNames.length - 1 ? (
        ''
      ) : (
        <RDropdownMenu.Separator className={s.DropdownMenuSeparator} />
      )}
    </>
  ))
}
