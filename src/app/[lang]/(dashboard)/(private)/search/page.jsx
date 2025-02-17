// Next Imports

// MUI Imports
import Grid from '@mui/material/Grid2'

import SearchTable from './SearchTable'

const SearchPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SearchTable />
      </Grid>
    </Grid>
  )
}

export default SearchPage
