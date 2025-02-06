'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const tabData = [
  {
    type: 'orders',
    avatarIcon: 'tabler-shopping-cart',
    series: [{ data: [28, 10, 46, 38, 15, 30, 35, 28, 8] }]
  },
  {
    type: 'sales',
    avatarIcon: 'tabler-chart-bar',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30] }]
  },
  {
    type: 'profit',
    avatarIcon: 'tabler-currency-dollar',
    series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8] }]
  },
  {
    type: 'income',
    avatarIcon: 'tabler-chart-pie-2',
    series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
  }
]

const renderTabs = value => {
  return tabData.map((item, index) => (
    <Tab
      key={index}
      value={item.type}
      className='mie-4'
      label={
        <div
          className={classnames(
            'flex flex-col items-center justify-center gap-2 is-[110px] bs-[100px] border rounded-xl',
            item.type === value ? 'border-solid border-[var(--mui-palette-primary-main)]' : 'border-dashed'
          )}
        >
          <CustomAvatar variant='rounded' skin='light' size={38} {...(item.type === value && { color: 'primary' })}>
            <i className={classnames('text-[22px]', { 'text-textSecondary': item.type !== value }, item.avatarIcon)} />
          </CustomAvatar>
          <Typography className='font-medium capitalize' color='text.primary'>
            {item.type}
          </Typography>
        </div>
      }
    />
  ))
}

const renderTabPanels = (value, theme, options, colors) => {
  return tabData.map((item, index) => {
    const max = Math.max(...item.series[0].data)
    const seriesIndex = item.series[0].data.indexOf(max)
    const finalColors = colors.map((color, i) => (seriesIndex === i ? 'var(--mui-palette-primary-main)' : color))

    return (
      <TabPanel key={index} value={item.type} className='!p-0'>
        <AppReactApexCharts
          type='bar'
          height={230}
          width='100%'
          options={{ ...options, colors: finalColors }}
          series={item.series}
        />
      </TabPanel>
    )
  })
}

const EarningReportsWithTabs = () => {
  // States
  const [value, setValue] = useState('orders')

  // Hooks
  const theme = useTheme()

  // Vars
  const disabledText = 'var(--mui-palette-text-disabled)'

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const colors = Array(9).fill('var(--mui-palette-primary-lightOpacity)')

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '33%',
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -11,
      formatter: val => `${val}k`,
      style: {
        fontWeight: 500,
        colors: ['var(--mui-palette-text-primary)'],
        fontSize: theme.typography.body1.fontSize
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -19,
        left: -4,
        right: 0,
        bottom: -11
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: 'var(--mui-palette-divider)' },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -18,
        formatter: val => `$${val}k`,
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    responsive: [
      {
        breakpoint: 1450,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          dataLabels: {
            style: {
              fontSize: theme.typography.body2.fontSize
            }
          },
          plotOptions: {
            bar: { columnWidth: '58%' }
          }
        }
      },
      {
        breakpoint: 500,
        options: {
          plotOptions: {
            bar: { columnWidth: '70%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Earning Reports'
        subheader='Yearly Earnings Overview'
        action={<OptionMenu options={['Last Week', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='earning report tabs'
            className='!border-0 mbe-10'
            sx={{
              '& .MuiTabs-indicator': { display: 'none !important' },
              '& .MuiTab-root': { padding: '0 !important', border: '0 !important' }
            }}
          >
            {renderTabs(value)}
            <Tab
              disabled
              value='add'
              label={
                <div className='flex flex-col items-center justify-center is-[110px] bs-[100px] border border-dashed rounded-xl'>
                  <CustomAvatar variant='rounded' size={34}>
                    <i className='tabler-plus text-textSecondary' />
                  </CustomAvatar>
                </div>
              }
            />
          </TabList>
          {renderTabPanels(value, theme, options, colors)}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default EarningReportsWithTabs
