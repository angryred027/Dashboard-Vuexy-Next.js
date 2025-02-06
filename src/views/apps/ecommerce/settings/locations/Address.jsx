'use client'

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

const Address = () => {
  // States
  const [country, setCountry] = useState('')

  return (
    <Card>
      <CardHeader title='Address' />
      <CardContent className='flex flex-col gap-4'>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              select
              fullWidth
              label='Country/Region'
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              <MenuItem value=''>Select Country</MenuItem>
              <MenuItem value='United States'>United States</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='Address' placeholder='123, New Street' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='Apartment, suite, etc.' placeholder='Empire Heights' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='Phone' placeholder='+1 (234) 456-7890' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='City' placeholder='New York' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth label='State' placeholder='New York' />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField fullWidth type='number' label='PIN code' placeholder='123897' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Address
