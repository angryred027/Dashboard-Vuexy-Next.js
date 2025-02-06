// MUI Imports
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Vars
const data = [
  {
    title: 'Earn a Certificate',
    description: 'Get the right professional certificate program for you.',
    type: 'Programs',
    image: '/images/illustrations/characters/8.png',
    color: 'primary',
    imageColorClass: 'bg-primaryLight',
    bgColorClass: 'bg-primaryLighter'
  },
  {
    title: 'Best Rated Courses',
    description: 'Enroll now in the most popular and best rated courses.',
    type: 'Courses',
    image: '/images/illustrations/characters/9.png',
    color: 'error',
    imageColorClass: 'bg-errorLight',
    bgColorClass: 'bg-errorLighter'
  }
]

const ColoredCards = () => {
  // Hooks
  const theme = useTheme()

  return (
    <Grid container spacing={6}>
      {data.map((item, index) => (
        <Grid size={{ xs: 12, md: 6 }} key={index}>
          <div
            className={classnames(
              'flex max-sm:flex-col items-center sm:items-start justify-between gap-6 rounded p-6',
              item.bgColorClass
            )}
          >
            <div className='flex flex-col items-center sm:items-start max-sm:text-center'>
              <Typography variant='h5' color={`${item.color}.main`} className='mbe-2'>
                {item.title}
              </Typography>
              <Typography className='mbe-4'>{item.description}</Typography>
              <Button variant='contained' size='small' color={item.color}>{`View ${item.type}`}</Button>
            </div>
            <div
              className={classnames(
                'flex justify-center rounded min-is-[180px] max-sm:-order-1 pbs-[7px]',
                item.imageColorClass
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className={classnames('bs-[120px]', { 'scale-x-[-1]': theme.direction === 'rtl' })}
              />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default ColoredCards
