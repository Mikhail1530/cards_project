import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import SignInPage from '@/pages/sign-in-page/sign-in-page'
import { useAuthMeQuery } from '@/services/auth/auth.service'
import DecksPage from '@/pages/decks-page/decks-page'

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/usersChart',
    element: <div>hello</div>,
  },
  {
    path: `/decks/:id/learn`,
    element: <div>in deck</div>,
  },
]

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
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
  const { isError, isLoading } = useAuthMeQuery() // before accessing any private resource we send autherization request (cookie) to server
  if (isLoading) {
    return null
  }
  const isAuthenticated = !isError
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
