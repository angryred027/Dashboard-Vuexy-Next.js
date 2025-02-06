// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const RadialBarChart = () => {
  // Vars
  const options = {
    chart: {
      sparkline: { enabled: true },
      parentHeightOffset: 0
    },
    grid: {
      padding: {
        bottom: 20
      }
    },
    stroke: {
      lineCap: 'round',
      curve: 'smooth'
    },
    colors: ['var(--mui-palette-warning-main)'],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '60%' },
        track: { background: 'var(--mui-palette-divider)', strokeWidth: '40%' },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '1.5rem',
            color: 'var(--mui-palette-text-primary)'
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1462,
        options: {
          chart: {
            width: 120,
            height: 130
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '1rem'
                }
              }
            }
          }
        }
      },
      {
        breakpoint: 1430,
        options: {
          chart: {
            height: 140
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 170,
            height: 189
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '1.5rem'
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='82.5k' subheader='Expenses' className='pbe-0' />
      <CardContent className='flex flex-col items-center'>
        <AppReactApexCharts type='radialBar' height={168} width='100%' options={options} series={[78]} />
        <Typography variant='body2' color='text.disabled' className='sm:mbs-2 lg:mbs-0'>
          $21k Expenses more than last month
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RadialBarChart
