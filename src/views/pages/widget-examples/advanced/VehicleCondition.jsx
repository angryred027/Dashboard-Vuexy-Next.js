// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Vars
const data = [
  { title: 'Incorrect address', subtitle: 'All exceptions', progress: 83, color: 'success', chipLabel: '+10' },
  { title: 'Good', subtitle: '24 Vehicles', progress: 11, color: 'info', chipLabel: '+9.1' },
  { title: 'Average', subtitle: '14 Vehicles', progress: 8, color: 'primary', chipLabel: '+2.5' },
  { title: 'Bad', subtitle: '8 Vehicles', progress: 6, color: 'warning', chipLabel: '-3.4' },
  { title: 'Not Working', subtitle: '4 Vehicles', progress: 2, color: 'error', chipLabel: '-12.6' }
]

const VehicleCondition = () => {
  return (
    <Card>
      <CardHeader title='Vehicles Condition' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <CardContent className='flex flex-col gap-8'>
        {data.map((item, i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='relative flex items-center justify-center'>
              <CircularProgress
                variant='determinate'
                size={54}
                value={100}
                thickness={3}
                className='absolute text-[var(--mui-palette-customColors-trackBg)]'
              />
              <CircularProgress
                variant='determinate'
                size={54}
                value={item.progress}
                thickness={3}
                color={item.color}
                sx={{ '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
              />
              <Typography className='absolute font-medium' color='text.primary'>
                {`${item.progress}%`}
              </Typography>
            </div>
            <div className='flex justify-between items-center is-full gap-4'>
              <div>
                <Typography className='font-medium mbe-1.5' color={`${item.color}.main`}>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <Chip variant='tonal' size='small' label={`${item.chipLabel}%`} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default VehicleCondition
