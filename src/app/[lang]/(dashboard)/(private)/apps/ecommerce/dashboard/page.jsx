// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import CongratulationsJohn from '@views/apps/ecommerce/dashboard/Congratulations'
import StatisticsCard from '@views/apps/ecommerce/dashboard/StatisticsCard'
import LineChartProfit from '@views/apps/ecommerce/dashboard/LineChartProfit'
import RadialBarChart from '@views/apps/ecommerce/dashboard/RadialBarChart'
import DonutChartGeneratedLeads from '@views/apps/ecommerce/dashboard/DonutChartGeneratedLeads'
import RevenueReport from '@views/apps/ecommerce/dashboard/RevenueReport'
import EarningReports from '@views/apps/ecommerce/dashboard/EarningReports'
import PopularProducts from '@views/apps/ecommerce/dashboard/PopularProducts'
import Orders from '@views/apps/ecommerce/dashboard/Orders'
import Transactions from '@views/apps/ecommerce/dashboard/Transactions'
import InvoiceListTable from '@views/apps/ecommerce/dashboard/InvoiceListTable'

// Data Imports
import { getInvoiceData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}
 */
const EcommerceDashboard = async () => {
  // Vars
  const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <CongratulationsJohn />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <StatisticsCard />
      </Grid>
      <Grid size={{ xs: 12, xl: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <LineChartProfit />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <RadialBarChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6, xl: 12 }}>
            <DonutChartGeneratedLeads />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, xl: 8 }}>
        <RevenueReport />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <EarningReports />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <PopularProducts />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <Orders />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <Transactions />
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <InvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default EcommerceDashboard
