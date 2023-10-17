import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'

// import { clsx } from 'clsx'

import s from './input.module.scss'

export type InputProps = {
  className?: string
  error?: string
  inputIcon?: string
  label?: string
  onChange?: (value: string) => void
  placeholder: string
  type: string
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input: FC<InputProps> = props => {
  const { className, inputIcon, placeholder, type, ...rest } = props

  const [inputValue, setInputValue] = useState('') // Инициализируем значение как пустую строку

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div className={s.inputContainer}>
      <div>
        <label className={s.inputLabel}>Input</label>
      </div>
      <input
        className={className ? s[className] : 'default'}
        onChange={handleChange}
        placeholder={placeholder}
        value={inputValue}
        {...rest}
        type={type}
      />
    </div>
  )
}
