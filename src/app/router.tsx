import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'
import { DecksPage, SignInPage } from '@/view/pages'
import { DeckPage } from '@/view/pages/DeckPage/DeckPage'
import { userActions } from '@/view/modules/auth/slices/auth-slice'
import { useDispatch } from 'react-redux'
import { SignUpPage } from '@/view/pages/SignUpPage/SignUpPage'
import { ForgotPasswordPage } from '@/view/pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from '@/view/pages/ResetPasswordPage/ResetPasswordPage'
import Loading from '@/view/assets/components/Loading/Loading'
import { DeckLearnPage } from '@/view/pages/DeckLearnPage/DeckLearnPage'

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: `/decks/:id`,
    element: <DeckPage />,
  },
  { path: '/decks/:id/learn', element: <DeckLearnPage /> },
]

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />,
  },
]

export const Router = () => {
  return <RouterProvider router={router} />
}

//The route that matches is decided by the order of the routes in the router array.
// The routes are matched from top to bottom (in the order they are defined),
// and the first route that matches is the one that gets rendered.
const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

//Outlet becomes any component that we specify in privateRoutes object as element.
//When the PrivateRoutes function is called Outlet Router will match the first path in
//privateRoutes object. It's basically a first-match-win system.
//React Router's `<Outlet/>` component acts as a placeholder for the child routes.
//When you navigate to a specific URL, React Router will match that URL
//with the first matching route path it finds in the nested children routes.
//The corresponding component or element assigned to the 'element' property of
//that matched route will then be rendered at the location of the `<Outlet/>`
//component.
function PrivateRoutes() {
  const dispatch = useDispatch()
  const { data, isError, isSuccess, isLoading } = useAuthMeQuery() // before accessing any private resource we send autherization request (cookie) to server
  if (isLoading) {
    return <Loading />
  }
  // FIXME: currently it sets data from useAuthMeQuery everytime i open new page, but do i need to do so?
  if (isSuccess && data) {
    dispatch(userActions.setUserDataAC(data))
  }
  const isAuthenticated = !isError
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
