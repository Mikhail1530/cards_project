import React, { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import classNames from 'classnames'

import s from './input.module.scss'

export type InputProps = {
  className?: string
  error?: string
  inputIcon?: 'image' | 'search' | undefined
  label?: string
  onChange?: (value: string) => void
  placeholder?: string
  type: string
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef(
  (
    {
      className,
      error,
      inputIcon,
      label,
      onChange,
      placeholder,
      type,
      value,
      ...restPros
    }: InputProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    const [inputValue, setInputValue] = useState(value)
    const [showPassword, SetShowPassword] = useState(false)
    const getType = (type: string) => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password'
      }

      return type
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value)
    }

    const inputClasses = classNames(s.input, {
      [s.passwordInput]: type === 'password',
      [s.searchInput]: type === 'search',
    })

    return (
      <div>
        <div>
          <label className={s.inputLabel} htmlFor={'icon'}>
            Input
          </label>
        </div>
        <div className={s.inputContainer}>
          {type === 'search' && (
            <button className={s.searchIcon} type={'button'}>
              <SearchOutlinedIcon />
            </button>
          )}
          {type === 'password' && (
            <button
              className={s.passwordIcon}
              onClick={() => SetShowPassword(!showPassword)}
              type={'button'}
            >
              <VisibilityOutlinedIcon />
            </button>
          )}
          <input
            className={inputClasses}
            onChange={handleChange}
            placeholder={placeholder}
            type={getType(type)}
            value={inputValue}
            {...restPros}
            ref={ref}
            style={{ paddingLeft: type === 'search' ? '45px' : undefined }}
          />
        </div>
      </div>
    )
  }
)
