import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppRoutes from './utils/AppRoutes'
export const API_URL = "https://mentor-student-backend-a52k.onrender.com"

function App() {
  const routes = createBrowserRouter(AppRoutes);
   return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
