import React, { FC, useState } from 'react'
import './index.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import SearchInput from './components/Search/Search'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  selectError,
  selectLoading,
  selectRepositories,
} from './redux/selectors'
import { Loader } from './components/Loader/Loader'
import Table from './components/Table/Table'

const App: FC = () => {
  const [query, setQuery] = useState<string>('')
  const repositories = useSelector(selectRepositories)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  return (
    <>
      <header className='header'>
        <Box className='container'>
          <SearchInput setQuery={setQuery} />
        </Box>
      </header>
      <main className='main'>
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
        {!loading && !error && repositories.length === 0 && (
          <Typography
            fontSize={46}
            lineHeight='1.43'
            variant='h1'
            component='h1'
            className='title'
          >
            Добро пожаловать
          </Typography>
        )}
        {loading && <Loader />}
        {!loading && !error && repositories.length > 0 && (
          <Box className='main-box'>
            <Table query={query} />
          </Box>
        )}
      </main>
      <footer className='footer'>
        <Box className='container'>
          <p className='visually-hidden'>Все права защищены, 2024</p>
        </Box>
      </footer>
    </>
  )
}

export default App
