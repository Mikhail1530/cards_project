import { Typography } from '@/view/ui'

export const Error = (error: any) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    return (
      <>
        <Typography>An error has occurred:</Typography>
        <Typography>{errMsg}</Typography>
      </>
    )
  } else {
    return <div>{error.message}</div>
  }
}
