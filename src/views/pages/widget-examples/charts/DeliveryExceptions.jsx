'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))
const deliveryExceptionsChartSeries = [13, 25, 22, 40]

const DeliveryExceptions = () => {
  // Hooks
  const theme = useTheme()

  const options = {
    labels: ['Incorrect address', 'Weather conditions', 'Federal Holidays', 'Damage during transit'],
    stroke: {
      width: 0
    },
    colors: [
      'var(--mui-palette-success-main)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.8)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.6)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.4)'
    ],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${Number.parseInt(val)}%`
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 10,
      markers: {
        width: 8,
        height: 8,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '13px',
      fontWeight: 400,
      labels: {
        colors: 'var()',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: {
              fontSize: '24px',
              color: 'var(--mui-palette-text-primary)',
              fontWeight: 500,
              offsetY: -20
            },
            name: { offsetY: 20 },
            total: {
              show: true,
              fontSize: '0.9375rem',
              fontWeight: 400,
              label: 'AVG. Exceptions',
              color: 'var(--mui-palette-text-secondary)',
              formatter() {
                return '30%'
              }
            }
          }
        }
      }
    }
  }

  return (
    <Card className='bs-full'>
      <CardHeader title='Delivery exceptions' action={<OptionMenu options={['Select All', 'Refresh', 'Share']} />} />
      <CardContent>
        <AppReactApexCharts
          type='donut'
          height={370}
          width='100%'
          series={deliveryExceptionsChartSeries}
          options={options}
        />
      </CardContent>
    </Card>
  )
}

export default DeliveryExceptions
