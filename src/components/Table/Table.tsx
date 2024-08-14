import { FC, useState } from 'react'
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
import { AppDispatch, RootState } from '../../redux/store'
import {
  selectLoading,
  selectRepositories,
  selectSelectedRepository,
} from '../../redux/selectors'
import { clearSelectedRepository, fetchRepositories, selectRepository } from '../../redux/reducer'
interface TableProps {
	query: string;
}
const Table: FC<TableProps> = ({ query }) => {
  const dispatch = useDispatch<AppDispatch>();
  const repositories = useSelector(selectRepositories);
  const loading = useSelector(selectLoading);
  const selectedRepository = useSelector(selectSelectedRepository);
  const hasNextPage = useSelector((state: RootState) => state.github.hasNextPage);
  const endCursor = useSelector((state: RootState) => state.github.endCursor);
console.log(endCursor, hasNextPage)
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'stargazersCount', sort: 'desc' },
  ]);

  const handleRowClick = (params: GridRowParams) => {
    dispatch(selectRepository(params.row));
  };

  const handleCloseDialog = () => {
    dispatch(clearSelectedRepository());
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (newPage > page && hasNextPage) {
      dispatch(fetchRepositories({ query, first: pageSize, after: endCursor }));
      console.log('Fetching additional repositories...');
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование репозитория', width: 182 },
    { field: 'language', headerName: 'Язык', width: 182 },
    { field: 'forksCount', headerName: 'Число форков', width: 182, sortable: true },
    { field: 'stargazersCount', headerName: 'Число звезд', width: 182, sortable: true },
    { field: 'updatedAt', headerName: 'Дата обновления', width: 182, sortable: true },
  ];

  console.log('Repositories:', repositories);
  console.log('Loading state:', loading);
  console.log('Selected repository:', selectedRepository);

  if (!repositories || repositories.length === 0) {
    return <Typography variant="body1">Не найдено репозиториев</Typography>;
  }

  return (
    <Box sx={{ height: 572, width: '100%' }}>
      <DataGrid
        rows={repositories}
        columns={columns}
      paginationModel={{ pageSize, page }}
  onPaginationModelChange={(newPaginationModel) => {
    setPage(newPaginationModel.page);
    setPageSize(newPaginationModel.pageSize);
    handlePageChange(newPaginationModel.page);
  }}
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
              <strong>License:</strong> {selectedRepository.licenseInfo?.name || 'No license'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};


export default Table
