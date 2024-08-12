import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (      <ThreeDots
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
  )
}