import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { Repository } from '../../redux/reducer'
import styles from './RepositoryInfo.module.scss'

interface RepositoryInfoProps {
  selectedRepository: Repository | null
}

const RepositoryInfo: FC<RepositoryInfoProps> = ({ selectedRepository }) => {
  return (
    <Box className={styles['repo-info']}>
      {selectedRepository !== null ? (
        <Box>
          <Typography variant='body1'>{selectedRepository?.name}</Typography>
          <Typography variant='body1'>
            <strong>License:</strong>
            {selectedRepository?.licenseInfo?.name || 'No license'}
          </Typography>
        </Box>
      ) : (
        <Box className={styles['add-container']}>
          <Typography
            component='p'
            fontSize={14}
            lineHeight='1.43'
            className={styles['add-text']}
          >
            Выберите репозитарий
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default RepositoryInfo
