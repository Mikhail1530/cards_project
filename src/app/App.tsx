import { Router } from '@/app/router'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

export function App() {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  )
}
