// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import HorizontalWithBorder from '@components/card-statistics/HorizontalWithBorder'

const LogisticsStatisticsCard = ({ data }) => {
  return (
    data && (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <HorizontalWithBorder {...item} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default LogisticsStatisticsCard
