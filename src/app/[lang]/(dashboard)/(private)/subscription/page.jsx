// React Imports
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// Next Imports
import Link from 'next/link'
import { getSession, useSession } from "next-auth/react";

// MUI Imports
import { CircularProgress, Grid2, Card, Typography, CardContent, Button }
  from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clickedId, setClickedId] = useState(-100);
  const [currentPlanId, setCurrentPlanId] = useState(-100);
  const [currentPlanStatus, setCurrentPlanStatus] = useState('active');
  const { data: session, status, update } = useSession();

  useEffect(() => {
    getCurrentPlanId();
    async function fetchData() {
      const res = await fetch('/api/plan');
      if (res && res.ok) {
        const obj = await res.json();
        const plans = obj.data;
        setPlans(plans);
      }
    }
    fetchData();
  }, [status, session]);

  const getCurrentPlanId = () => {
    const planId = session?.user?.subscription?.planId;
    if (planId) setCurrentPlanId(planId);
    else return setCurrentPlanId(-100);
  }
  const getCurrentPlanStatus = () => {
    const status = session?.user?.subscription?.status;
    setCurrentPlanStatus(status);
  }

  const getPlanButtonText = (planId) => {
    if (currentPlanId > 0) {
      if (planId < currentPlanId) return "Downgrade";
      else if (planId === currentPlanId) return "Renew";
      else if (planId > currentPlanId) return "Upgrade";
    }
    else return "Get Started";
  }

  const handleChange = e => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  const handleSubscriptionAction = async (user, plan) => {
    if (!session) return;

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, plan }),
      credentials: 'include',
    });

    const obj = await res.json();
    if (res && res.ok) {
      session.user.subscription = { planId: plan.id, status: 'active' };
      const updatedSession = await update({
        subscription: {
          planId: plan.id,
          status: "active",
        },
      });
      console.log("updatedSession", updatedSession);
      if (updatedSession)
        toast.success(obj.success.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
    } else {
      console.error(obj.error);
      toast.error(obj.error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  }

  const handleClick = async (e, plan) => {

    const clickedId = e.target.id;
    setLoading(true);
    setClickedId(clickedId);

    if (plan) {
      if (plan.id !== 1) {
        const url = `/subscription/checkout?amount=${plan.price}`;
        router.push(url);
      }
      else {
        if (!session) {
          setLoading(false);
          return;
        }
        const user = session.user;
        const userId = user?.id;
        const description = "Subscription Upgrade From 'Free' to 'Basic'";
        const amount = Number.parseFloat(plan.price);
        const data = {
          userId: userId,
          description: description,
          amount: amount,
          status: 'Completed',
        }
        console.log(data)
        const apiUrl = `/api/transaction`;
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (res && res.ok) {
          toast.success(resData.success.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await handleSubscriptionAction(user, plan);
        }
        else {
          toast.error(resData.error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
          return;
        }
      }
    }
    setLoading(false);
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
        <Grid2 container spacing={6}>
          {plans.map((plan, index) => (
            <Grid2 key={index} size={{ xs: 12, lg: 4 }}>
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
                  <div>
                    <div className='flex flex-col gap-3 mbs-3  my-8 h-24'>
                      {plan.benefits.map((feature, index) => (
                        <div key={index} className='flex items-center gap-[12px]'>
                          <CustomAvatar color='primary' skin={plan.current ? 'filled' : 'light'} size={20}>
                            <i className='tabler-check text-sm' />
                          </CustomAvatar>
                          <Typography variant='h6'>{feature}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    id={index}
                    // component={Link}
                    // href={`/subscription/checkout?amount=${plan.price}`}
                    disabled={(currentPlanId === index + 1) &&
                      currentPlanStatus === 'active'}
                    onClick={(e) => { handleClick(e, plan) }}
                    variant={(plan.id == index + 1) ? 'contained' : 'tonal'}>
                    {(loading && clickedId == index) ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      getPlanButtonText(plan.id)
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </div>
    </section>
  )
}

export default PricingPlan
