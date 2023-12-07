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
  // onValueChange?: (
  //   value?: string | undefined,
  //   e?: ChangeEvent<HTMLInputElement> | undefined
  // ) => void
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
      // onValueChange,
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
    const isFileType = type === 'file'
    // const isSearchType = type === 'search'
    console.log(isFileType, 'ifFiletype')

    const finalType = getFinalType(type, showPassword)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
      // onValueChange?.(e.target.value)
      // }
    }

    const classNames = {
      error: clsx(s.errorText),
      field: clsx(
        s.field,
        !!errorMessage && s.error,
        search && s.hasLeadingIcon,
        isFileType && s.fileType,
        className
      ),
      fileInputContainer: clsx(s.fileInputContainer, isFileType && className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      leadingIcon: s.leadingIcon,
      root: clsx(s.root, containerProps?.className),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {isFileType ? (
            <div className={classNames.fileInputContainer}>
              <label htmlFor="fileInput" className={s.fileInputLabel}>
                {fileInputLabelText}
                {icon}
              </label>
              <input
                id="fileInput"
                className={clsx(s.fileInput, className)}
                type="file"
                ref={ref}
                onChange={handleChange}
                {...restProps}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
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
  }
  return type
}
