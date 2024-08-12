import React, { FC } from 'react'
import './index.css'
import './App.css'
import { ToastContainer } from 'react-toastify'

const App: FC = () => {
  return ( <main>
      <ToastContainer
        icon={false}
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <div>Добро пожаловать!</div>
    </main>
  )
}

export default App
