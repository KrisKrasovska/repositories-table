import { FC, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid'
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  selectLoading,
  selectRepositories,
  selectSelectedRepository,
} from '../../redux/selectors'
import { fetchRepositories, selectRepository } from '../../redux/reducer'
import RepositoryInfo from '../RepositoryInfo/RepositoryInfo'
import styles from './Table.module.scss'
interface TableProps {
  query: string
}
const Table: FC<TableProps> = ({ query }) => {
  const dispatch = useDispatch<AppDispatch>()
  const repositories = useSelector(selectRepositories)
  const loading = useSelector(selectLoading)
  const selectedRepository = useSelector(selectSelectedRepository)
  const hasNextPage = useSelector(
    (state: RootState) => state.github.hasNextPage
  )
  const endCursor = useSelector((state: RootState) => state.github.endCursor)
  const totalCount = useSelector((state: RootState) => state.github.totalPages)
  console.log(totalCount)
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  })
  console.log(repositories)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'stargazersCount', sort: 'desc' },
  ])
  const handleRowClick = (params: GridRowParams) => {
    dispatch(selectRepository(params.row))
  }
  console.log(pageModel)
  const theme = createTheme({
    components: {
      MuiTablePagination: {
        styleOverrides: {
          selectLabel: {
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '19.92px',
            letterSpacing: '0.4px',
            textAlign: 'left',
          },
          root: {
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '19.92px',
            letterSpacing: '0.4px',
          },
          displayedRows: {
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '19.92px',
            letterSpacing: '0.4px',
          },
        },
      },
    },
  })
//   const handleChangePage = useCallback((totalCount:number,hasNextPage:boolean, query: string, dispatch: AppDispatch, endCursor: string | null ) => {

//   }, [pageModel.page, pageModel.pageSize])
// useEffect(()=> {

//  if ( pageModel.page <= totalCount && hasNextPage) {
//      dispatch(
//        fetchRepositories({
//          query,
//          first: pageModel.pageSize,
//          after: endCursor,
//        })
//      )
//    }

// },[])


  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование репозитория', width: 182 },
    { field: 'language', headerName: 'Язык', width: 182 },
    {
      field: 'forksCount',
      headerName: 'Число форков',
      width: 182,
      sortable: true,
    },
    {
      field: 'stargazersCount',
      headerName: 'Число звезд',
      width: 182,
      sortable: true,
    },
    {
      field: 'updatedAt',
      headerName: 'Дата обновления',
      width: 182,
      sortable: true,
    },
  ]

  return (
    <Box display='flex' sx={{ width: '100%' }}>
      {repositories.length > 0 && (
        <Box className={styles['table-container']}>
          <Typography
            fontSize={48}
            lineHeight='1.17'
            marginTop='24px'
            marginBottom='24px'
            component='h2'
            className={styles['table__results']}
          >
            Результаты поиска
          </Typography>
          <ThemeProvider theme={theme}>
            <DataGrid
              autoHeight
              className={styles['table']}
              rows={repositories}
              columns={columns}
              paginationModel={pageModel}
              paginationMode='server'
              rowCount={totalCount} // Используем общее количество репозиториев
              onPaginationModelChange={setPageModel}
              pageSizeOptions={[10, 20, 30]}
              pagination
              loading={loading}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              onRowClick={handleRowClick}
              getRowClassName={(params) =>
                params.row.id === selectedRepository?.id
                  ? styles.selectedRow
                  : ''
              }
            />
          </ThemeProvider>
        </Box>
      )}
      <RepositoryInfo selectedRepository={selectedRepository} />
    </Box>
  )
}

export default Table
