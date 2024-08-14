import React, { FC, useState } from 'react'
import './index.css'
import './App.css'
import { ToastContainer } from 'react-toastify'
import SearchInput from './components/Search/Search'
import { Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectError, selectLoading, selectRepositories } from './redux/selectors'
import { Loader } from './components/Loader/Loader'
import Table from './components/Table/Table'
import RepositoryInfo from './components/RepositoryInfo/RepositoryInfo'

const App: FC = () => {
	 const [query, setQuery] = useState<string>('');
	 const repositories = useSelector(selectRepositories);
	  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  return (
    <>
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
      <header className='header'>
        <Box className='container'>
          <SearchInput query={query} setQuery={setQuery} />
        </Box>
      </header>
      <main className='main'>
        <Box className='container'>
          {!loading && !error && repositories.length === 0 && <Typography variant="h1" component="h1" className='title'>Добро пожаловать</Typography>}
			 {loading && <Loader />}
			 {!loading && !error && repositories.length > 0 && <Box className='main-box'><Table query={query} /><RepositoryInfo /></Box>}
        </Box>
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
