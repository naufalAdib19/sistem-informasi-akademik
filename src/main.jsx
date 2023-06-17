import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mahasiswa from './assets/pages/dashboardMahasiswa'
import Login from './assets/pages/login'
import TambahKRS from './assets/pages/tambahKRSMahasiswa'
import Loading from './assets/fragments/Loading'
import Register from './assets/pages/register'
import { Provider } from 'react-redux'
import LoadProvider from './assets/helper/Loaders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mahasiswa/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/krs',
    element: <TambahKRS/>
  },
  {
    path: '/loading',
    element: <Loading/>
  },
  {
    path: '/register',
    element: <Register/>
  }
    
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadProvider>
      <RouterProvider router={router}/>
    </LoadProvider>
  </React.StrictMode>,
)
