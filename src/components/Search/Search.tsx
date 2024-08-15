import { Dispatch, ChangeEvent, FC, SetStateAction, useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import styles from './Search.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { selectLoading } from '../../redux/selectors'
import { fetchRepositories } from '../../redux/reducer'
interface SearchProps {
  setQuery: Dispatch<SetStateAction<string>>
  query: string
}

const SearchInput: FC<SearchProps> = ({ setQuery, query }) => {
  const [searchText, setSearchText] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector(selectLoading)

  const handleSearch = () => {
    setQuery(searchText)

    if (searchText) {
      dispatch(fetchRepositories({ query: searchText, first: 10, after: null }))
      setSearchText('')
    }
  }

  return (
    <Box
      className={styles.form}
      component='form'
      display='flex'
      alignItems='center'
      gap={1}
    >
      <TextField
        id='input'
        placeholder='Введите поисковый запрос'
        variant='filled'
        value={searchText}
        className={styles.input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value)
        }}
      />
      <Button
        className={styles.btn}
        variant='contained'
		  type='button'
        disabled={loading}
        onClick={() => {
          handleSearch()
        }}
      >
        Искать
      </Button>
    </Box>
  )
}

export default SearchInput
