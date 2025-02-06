// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import CustomerDetails from './CustomerDetails'
import CustomerPlan from './CustomerPlan'

const CustomerLeftOverview = ({ customerData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <CustomerDetails customerData={customerData} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomerPlan />
      </Grid>
    </Grid>
  )
}

export default CustomerLeftOverview
