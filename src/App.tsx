import { Button } from '@/components'

export function App() {
  return (
    <div>
      <Button as={'a'} href={'http//localhost:5173/hello'} variant={'link'}>
        Link
      </Button>
    </div>
  )
}
