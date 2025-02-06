// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const LocationName = () => {
  return (
    <Card>
      <CardHeader title='Location Name' />
      <CardContent className='flex flex-col items-start gap-4'>
        <CustomTextField fullWidth label='Location Name' placeholder='Empire Hub' />
        <FormControlLabel control={<Checkbox defaultChecked />} label='Fulfill online orders from this location' />
        <Alert severity='info' icon={<i className='tabler-info-circle' />} className='font-medium text-lg'>
          This is your default location. To change whether you fulfill online orders from this location, select another
          default location first.
        </Alert>
      </CardContent>
    </Card>
  )
}

export default LocationName
