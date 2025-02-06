'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Styles Imports
import './styles.css'

// Vars
const colors = {
  series1: '#7367F0',
  series2: '#8F85F3',
  series3: '#ABA4F6'
}

const labelColor = 'var(--mui-palette-text-disabled)'
const bodyColor = 'var(--mui-palette-text-secondary)'
const borderColor = 'var(--mui-palette-divider)'

const series = [
  {
    name: 'Delivery rate',
    type: 'column',
    data: [5, 4.5, 4, 3]
  },
  {
    name: 'Delivery time',
    type: 'column',
    data: [4, 3.5, 3, 2.5]
  },
  {
    name: 'Delivery exceptions',
    type: 'column',
    data: [3.5, 3, 2.5, 2]
  }
]

const CarrierPerformance = () => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      tickAmount: 10,
      categories: ['Carrier A', 'Carrier B', 'Carrier C', 'Carrier D'],
      labels: {
        style: {
          colors: labelColor,
          fontSize: '13px',
          fontFamily: 'Public Sans',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      tickAmount: 4,
      max: 5,
      min: 0,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '13px',
          fontFamily: 'Public Sans',
          fontWeight: 400
        },
        formatter(o) {
          return o
        }
      }
    },
    legend: {
      markers: {
        width: 8,
        height: 8,
        offsetX: -3,
        radius: 12
      },
      height: 33,
      offsetY: 10,
      itemMargin: {
        horizontal: 10,
        vertical: 0
      },
      fontSize: '13px',
      fontFamily: 'Public Sans',
      fontWeight: 400,
      labels: {
        colors: bodyColor,
        useSeriesColors: false
      }
    },
    grid: {
      borderColor,
      strokeDashArray: 6
    },
    colors: [colors.series1, colors.series2, colors.series3],
    fill: {
      opacity: 1
    }
  }

  return (
    <Card>
      <CardHeader title='Carrier Performance' action={<OptionMenu options={['View More', 'Delete']} />} />
      <CardContent>
        <AppReactApexCharts
          id='carrier-performance'
          type='bar'
          height={360}
          width='100%'
          series={series}
          options={options}
        />
      </CardContent>
    </Card>
  )
}

export default CarrierPerformance
