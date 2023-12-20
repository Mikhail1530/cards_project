import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { ChangeEvent, ReactNode } from 'react'
import { TextFieldProps } from '@/view/ui/TextField/TextField'
import { FileUploader } from '@/view/ui/FileUploader/FileUploader'
import { cardsActions } from '@/view/modules/cards/slice/cards.slice'
import { useDispatch } from 'react-redux'
import { setCoverImagePreview } from '@/view/modules/decks/slice/DecksSlice'

type ControlledFileUploaderProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  icon?: ReactNode
  imagePreviewType: 'question' | 'answer' | 'cover'
} & Omit<TextFieldProps, 'value' | 'onChange' | 'ref'>

export const ControlledFileUploader = <T extends FieldValues>({
  control,
  name,
  imagePreviewType,
  icon,
  ...rest
}: ControlledFileUploaderProps<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ control: control, name: name })
  const dispatch = useDispatch()
  //If FileList is empty keep defaulValue of 'cover' as value from useController otherwise
  //change value from useController to Img File
  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!e || !e.target || !e.target.files) return
    const image = e.target.files[0]
    if (!image) return
    onChange(image)

    if (imagePreviewType === 'question') {
      handleImagePreview(image, result => dispatch(cardsActions.setQuestionImagePreview(result)))
      // Result is the base64-encoded data URL string of the file contents (fileReader.result).
      // This result is a data URL string, which is a base64-encoded representation of the contents of the file.
    }
    if (imagePreviewType === 'answer') {
      handleImagePreview(image, result => dispatch(cardsActions.setAnswerImagePreview(result)))
    }
    if (imagePreviewType === 'cover') {
      handleImagePreview(image, result => dispatch(setCoverImagePreview(result)))
    }
  }

  return (
    <FileUploader
      icon={icon}
      ref={ref}
      value={value.filename}
      name={name}
      onChange={handleOnChange}
      {...rest}
    />
  )
}

export const handleImagePreview = (file: File, previewCallback: (result: any) => void) => {
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    previewCallback(fileReader.result)
  })
  fileReader.readAsDataURL(file)
}
