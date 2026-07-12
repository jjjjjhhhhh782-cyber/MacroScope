import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const LandingPage = lazy(() => import('./landing/LandingPage'))
const AppHome = lazy(() => import('./app/AppHome'))
const SignInPage = lazy(() => import('./app/auth/SignInPage'))
const SignUpPage = lazy(() => import('./app/auth/SignUpPage'))
const NotFound = lazy(() => import('./shared/components/NotFound'))

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/signin', element: <SignInPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/app', element: <AppHome /> },
  { path: '*', element: <NotFound /> },
])
