import React, { useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  selectLoading,
  selectRepositories,
  selectSelectedRepository,
} from '../../redux/selectors'
import { clearSelectedRepository, selectRepository } from '../../redux/reducer'

const Table: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const repositories = useSelector(selectRepositories)
  const loading = useSelector(selectLoading)
  const selectedRepository = useSelector(selectSelectedRepository)
  const [pageSize, setPageSize] = useState<number>(1)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'stargazersCount', sort: 'desc' },
  ])
console.log(repositories)
  const handleRowClick = (params: GridRowParams) => {
    dispatch(selectRepository(params.row))
  }

  const handleCloseDialog = () => {
    dispatch(clearSelectedRepository())
  }

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
    <Box sx={{ height: 572, width: '100%' }}>
      <DataGrid
        rows={repositories}
        columns={columns}
        paginationModel={{ pageSize, page: 0 }}
        onPaginationModelChange={(newPaginationModel) =>
          setPageSize(newPaginationModel.pageSize)
        }
        pageSizeOptions={[10, 20, 30]}
        pagination
        loading={loading}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        onRowClick={handleRowClick}
      />
      {selectedRepository && (
        <Dialog open={true} onClose={handleCloseDialog}>
          <DialogTitle>{selectedRepository.name}</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>
              <strong>Description:</strong> {selectedRepository.description}
            </Typography>
            <Typography variant='body1'>
              <strong>License:</strong>{' '}
              {selectedRepository.licenseInfo?.name || 'No license'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default Table
