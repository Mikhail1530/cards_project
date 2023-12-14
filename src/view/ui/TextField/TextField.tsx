import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react'

import { clsx } from 'clsx'
import s from './TextField.module.scss'
import { Typography } from '@/view/ui'
import Eye from '@/view/assets/icons/eye/Eye'
import EyeCrossed from '@/view/assets/icons/eye/EyeCrossed'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  root?: string
  icon?: ReactNode
  search?: boolean
  fileInputLabelText?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerProps,
      errorMessage,
      label,
      labelProps,
      onChange,
      icon,
      placeholder,
      search,
      type,
      fileInputLabelText,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const isShowPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, showPassword)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
    }

    const classNames = {
      error: clsx(s.errorText),
      field: clsx(s.field, !!errorMessage && s.error, search && s.hasLeadingIcon, className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      leadingIcon: s.leadingIcon,
      root: clsx(s.root, className, containerProps?.className),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {icon && (
            <label htmlFor={'inputId'} className={s.icon}>
              {icon}
            </label>
          )}
          <input
            className={classNames.field}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            id="inputId"
            {...restProps}
          />
          {isShowPasswordButtonShown && (
            <button
              className={s.showPassword}
              onClick={() => setShowPassword(prev => !prev)}
              type={'button'}
            >
              {showPassword ? <Eye /> : <EyeCrossed />}
            </button>
          )}
        </div>
        <Typography className={classNames.error}>{errorMessage}</Typography>
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  } else {
    return type
  }
}
