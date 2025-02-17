// React Imports
"use client"
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import frontCommonStyles from './front-styles.module.css'
import styles from './styles.module.css'

const planImages = [
  '/images/front-pages/landing-page/pricing-basic.png',
  '/images/front-pages/landing-page/pricing-team.png',
  '/images/front-pages/landing-page/pricing-enterprise.png'
];

const PricingPlan = () => {
  // States
  const [pricingPlan, setPricingPlan] = useState('annually')
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/plan');
      if(res && res.ok){
        const obj = await res.json();
        const plans = obj.data;
        setPlans(plans);
        console.log(plans, plans[0]);
      }
    }
    fetchData();
  }, []);

  const handleChange = e => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <section
      id='pricing-plans'
      className={classnames(
        'flex flex-col gap-8 lg:gap-12 plb-[30px] bg-backgroundDefault rounded-[60px]',
        styles.sectionStartRadius
      )}
    >
      <div className={classnames('is-full', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                  Tailored subscription plans
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[10%] sm:inline-start-[-19%] block-start-[17px]'
                  />
                </span>{' '}
                designed for you
              </Typography>
            </div>
            <Typography className='text-center max - sm:mlb-3 mbe-6 pb-2'>
              All plans include 40+ advanced tools and features to boost your product.
              <br />
              Choose the best plan to fit your needs.
            </Typography>
          </div>
        </div>
        <Grid container spacing={6}>
          {plans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, lg: 4 }}>
              <Card className={`${true && 'border-2 border-[var(--mui-palette-primary-main)] shadow-xl'}`}>
                <CardContent className='flex flex-col gap-8 p-8'>
                  <div className='is-full flex flex-col items-center gap-3'>
                    <img src={planImages[index]} alt={plan.img} height='88' width='86' className='text-center' />
                  </div>
                  <div className='flex flex-col items-center gap-y-[2px] relative'>
                    <Typography className='text-center' variant='h4'>
                      {plan.name}
                    </Typography>
                    <div className='flex items-baseline gap-x-1'>
                      <Typography variant='h2' color='primary.main' className='font-extrabold'>
                        ${plan.price}
                      </Typography>
                      <Typography color='text.disabled' className='font-medium'>
                        / {plan.durationDays} Days
                      </Typography>
                    </div>
                  </div>
                  {/* <div>
                    <div className='flex flex-col gap-3 mbs-3'>
                      {plan.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-[12px]'>
                          <CustomAvatar color='primary' skin={plan.current ? 'filled' : 'light'} size={20}>
                            <i className='tabler-check text-sm' />
                          </CustomAvatar>
                          <Typography variant='h6'>{feature}</Typography>
                        </div>
                      ))}
                    </div>
                  </div> */}
                  <Button component={Link} href='/subscription/checkout' variant={plan.current ? 'contained' : 'tonal'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default PricingPlan
