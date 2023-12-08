import s from './FileUploader.module.scss'
import { clsx } from 'clsx'
import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import { Typography } from '@/view/ui'

export type FileUploaderProps = {
  errorMessage?: string
  label?: string
  icon?: ReactNode
  name: string
  search?: boolean
  fileInputLabelText?: string
} & ComponentPropsWithoutRef<'input'>

export const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      className,
      errorMessage,
      label,
      onChange,
      icon,
      placeholder,
      search,
      name,
      fileInputLabelText,
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    const classNames = {
      root: clsx(s.root),
      error: clsx(s.errorText),
      label: clsx(s.label),
      fieldContainer: clsx(s.fieldContainer, className),
      fileInputContainer: clsx(s.fileInputContainer),
    }

    // It's important that id={name}. Otherwise it would link to the same Input
    return (
      <div className={classNames.root}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          <div className={classNames.fileInputContainer}>
            <label htmlFor={name} className={s.fileInputLabel}>
              {fileInputLabelText}
              {icon}
            </label>
            <input
              accept={'.jpg,.jpeg,.png'}
              id={name}
              className={clsx(s.fileInput, className)}
              type={'file'}
              ref={ref}
              onChange={handleChange}
              {...restProps}
            />
          </div>
        </div>
        <Typography className={classNames.error}>{errorMessage}</Typography>
      </div>
    )
  }
)
