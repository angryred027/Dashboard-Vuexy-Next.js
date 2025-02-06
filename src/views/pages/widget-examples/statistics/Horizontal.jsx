// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import CardStatHorizontal from '@/components/card-statistics/Horizontal'

const Horizontal = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <CardStatHorizontal {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Horizontal
