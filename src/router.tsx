import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { Decks } from '@/pages/decks.tsx'

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/usersChart',
    element: <div>hello</div>,
  },
]

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
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
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
