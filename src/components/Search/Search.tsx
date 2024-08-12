import { ChangeEvent, FC, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import styles from './Search.module.scss'
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectLoading } from '../../redux/selectors';
import { fetchRepositories } from '../../redux/reducer';


const SearchInput: FC = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
 const loading = useSelector(selectLoading);

  const handleSearch = () => {
    if (query) {
      dispatch(fetchRepositories(query));
		setQuery("")
    }
  };


  return (
    <Box className={styles.form} component='form' display="flex" alignItems="center" gap={1}>
      <TextField
	
		id="input"
		placeholder="Введите поисковый запрос"
        variant="filled"
        value={query}
		  className={styles.input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }
	}
      />
      <Button className={styles.btn} variant="contained" disabled={loading} onClick={()=>{handleSearch()}}>
        Искать
      </Button>
    </Box>
  );
};

export default SearchInput;
