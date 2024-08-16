import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import styles from './RepositoryInfo.module.scss'
import StarIcon from '@mui/icons-material/Star'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Repository } from '../../types/types'

interface RepositoryInfoProps {
  selectedRepository: Repository | null
}

const RepositoryInfo: FC<RepositoryInfoProps> = ({ selectedRepository }) => {
  return (
    <Box className={styles['repo-info']}>
      {selectedRepository !== null ? (
        <Box className={styles['repo-info__container']}>
          <Typography
            className={styles['repo-info__title']}
            variant='h3'
            component='h3'
            fontSize={32}
            lineHeight='1.25'
          >
            {selectedRepository?.name}
          </Typography>
          <Box className={styles['repo-info__top-content']}>
            <Box className={styles['repo-info__label']}>
              <Typography
                className={styles['repo-info__bottom-text']}
                component='p'
                fontSize={13}
                lineHeight='1.38'
              >
                {selectedRepository?.language}
              </Typography>
            </Box>
            <Box className={styles['repo-info__stars-container']}>
              <StarIcon
                sx={{ color: '#FFB400', width: '24px', height: '24px' }}
              />
              <Typography
                className={styles['repo-info__text']}
                fontSize={14}
                lineHeight='1.43'
                component='p'
              >
                {selectedRepository?.stargazersCount}
              </Typography>
            </Box>
          </Box>
          {selectedRepository?.topics.length > 0 ? (
            <List
              sx={{ padding: 0, marginBottom: '24px' }}
              className={styles['repo-info__list']}
            >
              {selectedRepository?.topics.map(
                (topic: string, index: number) => (
                  <ListItem
                    key={`${topic} ${index}`}
                    className={styles['repo-info__item']}
                  >
                    <Typography
                      className={styles['repo-info__text']}
                      component='span'
                      fontSize={13}
                      lineHeight='1.38'
                    >
                      {topic}
                    </Typography>
                  </ListItem>
                )
              )}
            </List>
          ) : (
            <Typography
              className={styles['repo-info__text']}
              component='p'
              fontSize={14}
              lineHeight='1.43'
              marginBottom={2}
            >
              No topics
            </Typography>
          )}
          <Typography
            className={styles['repo-info__text']}
            component='p'
            fontSize={14}
            lineHeight='1.43'
            marginBottom={2}
          >
            {selectedRepository?.description ?? 'No description'}
          </Typography>
          <Typography
            className={styles['repo-info__text']}
            component='p'
            fontSize={14}
            lineHeight='1.43'
          >
            {selectedRepository?.licenseInfo?.name ?? 'No license'}
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
