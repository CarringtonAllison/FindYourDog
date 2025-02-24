import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' 


import './index.css'
import Login from './pages/Login'
import NotFound404Page from './pages/NotFound404Page.tsx'
import Dogs from './pages/Dogs.tsx'
import Match from './pages/Match.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound404Page />,
  },
  {
    path: '/dogs',
    element: <Dogs />,
  },
  {
    path: '/Match',
    element: <Match />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}  />   
  </StrictMode>,
)
