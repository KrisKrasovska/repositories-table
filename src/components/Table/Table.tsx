import { FC, useEffect, useState } from 'react'
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
import {
  fetchRepositories,
  fetchRepositoriesPrev,
  selectRepository,
} from '../../redux/reducer'
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
  const hasPreviousPage = useSelector(
    (state: RootState) => state.github.hasPreviousPage
  )
  const endCursor = useSelector((state: RootState) => state.github.endCursor)
  const startCursor = useSelector(
    (state: RootState) => state.github.startCursor
  )
  const totalCount = useSelector((state: RootState) => state.github.totalPages)
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  })
  const [pageStatus, setPageStatus] = useState<'next' | 'prev'>('next')
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
  const handlePage = (model: GridPaginationModel) => {
    if (pageModel.page > model.page) {
      setPageStatus('prev')
    } else {
      setPageStatus('next')
    }
    setPageModel(model)
  }
  useEffect(() => {
    console.log(pageModel.page)
    if (pageModel.page > 0 && pageStatus === 'next' && hasNextPage) {
      console.log('next')
      dispatch(
        fetchRepositories({
          query,
          first: pageModel.pageSize,
          after: endCursor,
        })
      )
    }
    if (pageModel.page > 0 && pageStatus === 'prev' && hasPreviousPage) {
      console.log('prev')
      dispatch(
        fetchRepositoriesPrev({
          query,
          last: pageModel.pageSize,
          before: startCursor,
        })
      )
    }
  }, [
    pageModel.page,
    dispatch,
    endCursor,
    totalCount,
    pageModel.pageSize,
    query,
    pageStatus,
    hasNextPage,
    hasPreviousPage,
    startCursor,
  ])
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
              onPaginationModelChange={handlePage}
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
