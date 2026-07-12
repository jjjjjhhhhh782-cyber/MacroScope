import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const LandingPage = lazy(() => import('./landing/LandingPage'))
const AppHome = lazy(() => import('./app/AppHome'))
const NotFound = lazy(() => import('./shared/components/NotFound'))

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/app', element: <AppHome /> },
  { path: '*', element: <NotFound /> },
])
