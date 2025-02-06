// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

// Component Imports
import Link from '@components/Link'
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const TwoStepVerification = () => {
  return (
    <Card>
      <CardHeader title='Two-step verification' subheader='Keep your account secure with authentication step.' />
      <CardContent>
        <InputLabel htmlFor='sms' className='font-medium text-textPrimary mbe-1'>
          SMS
        </InputLabel>
        <div className='flex items-center gap-4 mbe-4'>
          <CustomTextField id='sms' placeholder='+1(968) 819-2547' fullWidth />
          <div className='flex'>
            <CustomIconButton>
              <i className='tabler-edit text-textPrimary' />
            </CustomIconButton>
            <CustomIconButton>
              <i className='tabler-user-plus text-textPrimary' />
            </CustomIconButton>
          </div>
        </div>
        <Typography>
          Two-factor authentication adds an additional layer of security to your account by requiring more than just a
          password to log in.{' '}
          <Typography component={Link} color='primary.main'>
            Learn more.
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TwoStepVerification
