import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/RegisterPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/ForgetPassword'

function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className='w-full h-[100vh]'>
          <Toaster position='top-right' />
          <Routes path='/'>
            <Route path='/*' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/admin/*' element={<AdminPage />} />
            <Route path='/test' element={<TestPage />}></Route>
          </Routes>

        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App