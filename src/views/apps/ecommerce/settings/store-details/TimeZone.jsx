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

const TimeZone = () => {
  // States
  const [timezone, setTimezone] = useState('')
  const [unit, setUnit] = useState('')
  const [defaultWeight, setDefaultWeight] = useState('')

  return (
    <Card>
      <CardHeader
        title='Time zone and units of measurement'
        subheader='Used to calculate product prices, shipping weights, and order times.'
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              select
              fullWidth
              label='Timezone'
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              <MenuItem value=''>Select Timezone</MenuItem>
              <MenuItem value='International Date Line West'>(UTC-12:00) International Date Line West</MenuItem>
              <MenuItem value='Coordinated Universal Time-11'>(UTC-11:00) Coordinated Universal Time-11</MenuItem>
              <MenuItem value='Alaska'>(UTC-09:00) Alaska</MenuItem>
              <MenuItem value='Baja California'>(UTC-08:00) Baja California</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField select fullWidth label='Unit system' value={unit} onChange={e => setUnit(e.target.value)}>
              <MenuItem value=''>Select Unit</MenuItem>
              <MenuItem value='Metric System'>Metric System</MenuItem>
              <MenuItem value='Imperial'>Imperial</MenuItem>
              <MenuItem value='International System'>International System</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              fullWidth
              label='Default weight unit'
              value={defaultWeight}
              onChange={e => setDefaultWeight(e.target.value)}
            >
              <MenuItem value=''>Select Weight Unit</MenuItem>
              <MenuItem value='Kilogram'>Kilogram</MenuItem>
              <MenuItem value='Pounds'>Pounds</MenuItem>
              <MenuItem value='Gram'>Gram</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TimeZone
