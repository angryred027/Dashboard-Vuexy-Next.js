// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import CardStatsWithAreaChart from '@components/card-statistics/StatsWithAreaChart'

const CardStatsLineAreaCharts = ({ data }) => {
  const renderData = data
    ? data.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <CardStatsWithAreaChart {...item} />
        </Grid>
      ))
    : null

  return (
    <Grid container spacing={6}>
      {renderData}
    </Grid>
  )
}

export default CardStatsLineAreaCharts
