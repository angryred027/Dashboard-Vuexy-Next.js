// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const BillingInformation = () => {
  // States
  const [country, setCountry] = useState('')

  return (
    <Card>
      <CardHeader title='Billing Information' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Legal business name' placeholder='Pixinvent' />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              fullWidth
              label='Country/Region'
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              <MenuItem value=''>Select Country</MenuItem>
              <MenuItem value='India'>India</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='United States'>United States</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Address' placeholder='126, New Street' />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField fullWidth label='Apartment,suit, etc.' placeholder='Empire Heights' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='City' placeholder='New York' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='State' placeholder='New York' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth type='number' label='PIN Code' placeholder='111011' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BillingInformation
