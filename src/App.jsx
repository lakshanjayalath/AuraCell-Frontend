import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>

      <div className='w-full h-[100vh]'>
        <Toaster position='top-right' />
        <Routes path='/'>
          <Route path='/*' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<h1>Register Page</h1>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage />}></Route>
        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App