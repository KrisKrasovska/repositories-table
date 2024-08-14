import { Box } from '@mui/material'
import { ThreeDots } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <Box
      width={200}
      display='flex'
      alignItems='center'
      justifyContent='center'
      marginLeft='auto'
      marginRight='auto'
    >
      <ThreeDots
        height='80'
        width='80'
        radius='9'
        color='#3e4d44'
        ariaLabel='three-dots-loading'
        wrapperStyle={{
          marginTop: '40',
        }}
        visible={true}
      />
    </Box>
  )
}
