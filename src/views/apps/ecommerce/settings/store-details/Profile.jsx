// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const Profile = () => {
  return (
    <Card>
      <CardHeader title='Profile' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Store name' placeholder='ABCD' />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Phone' placeholder='+(123) 456-7890' />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Store contact email' placeholder='johndoe@email.com' />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Sender email' placeholder='johndoe@email.com' />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Alert severity='warning' icon={<i className='tabler-bell' />} className='font-medium text-lg'>
              Confirm that you have access to johndoe@gmail.com in sender email settings.
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Profile
