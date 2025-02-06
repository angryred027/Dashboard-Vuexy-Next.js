// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useKeenSlider } from 'keen-slider/react'
import classnames from 'classnames'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppKeenSlider from '@/libs/styles/AppKeenSlider'

// SVG Imports
import HubSpot from '@assets/svg/front-pages/landing-page/HubSpot'
import Pinterest from '@assets/svg/front-pages/landing-page/Pinterest'
import Dribbble from '@assets/svg/front-pages/landing-page/Dribbble'
import Airbnb from '@assets/svg/front-pages/landing-page/Airbnb'
import Coinbase from '@assets/svg/front-pages/landing-page/Coinbase'
import Netflix from '@assets/svg/front-pages/landing-page/Netflix'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'

// Data
const data = [
  {
    desc: "I've never used a theme as versatile and flexible as Vuexy. It's my go to for building dashboard sites on almost any project.",
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'Eugenia Moore',
    position: 'Founder of Pinterest',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    desc: 'Materio is awesome, and I particularly enjoy knowing that if I get stuck on something.',
    svg: <Netflix color='#d34c4d' />,
    rating: 5,
    name: 'Tommy haffman',
    position: 'Founder of Netflix',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    desc: "This template is superior in so many ways. The code, the design, the regular updates, the support.. It's the whole package. Excellent Work.",
    svg: <Airbnb color='#FF5A60' />,
    rating: 4,
    name: 'Eugenia Moore',
    position: 'CTO of Airbnb',
    avatarSrc: '/images/avatars/3.png'
  },
  {
    desc: "All the requirements for developers have been taken into consideration, so I'm able to build any interface I want.",
    svg: <Coinbase color='#0199ff' />,
    rating: 5,
    name: 'Sara Smith',
    position: 'Founder of Coinbase',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    desc: "I've never used a theme as versatile and flexible as Vuexy. It's my go to for building dashboard sites on almost any project.",
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'Tommy haffman',
    position: 'Founder of Dribble',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    desc: "I've never used a theme as versatile and flexible as Vuexy. It's my go to for building dashboard sites on almost any project.",
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'Eugenia Moore',
    position: 'Founder of Pinterest',
    avatarSrc: '/images/avatars/6.png'
  },
  {
    desc: 'Materio is awesome, and I particularly enjoy knowing that if I get stuck on something.',
    svg: <HubSpot color='#FF5C35' />,
    rating: 5,
    name: 'Tommy haffman',
    position: 'Founder of HubSpot',
    avatarSrc: '/images/avatars/7.png'
  },
  {
    desc: "This template is superior in so many ways. The code, the design, the regular updates, the support.. It's the whole package. Excellent Work.",
    svg: <Airbnb color='#FF5A60' />,
    rating: 4,
    name: 'Eugenia Moore',
    position: 'CTO of Airbnb',
    avatarSrc: '/images/avatars/8.png'
  },
  {
    desc: "All the requirements for developers have been taken into consideration, so I'm able to build any interface I want.",
    svg: <Coinbase color='#0199ff' />,
    rating: 5,
    name: 'Sara Smith',
    position: 'Founder of Coinbase',
    avatarSrc: '/images/avatars/9.png'
  },
  {
    desc: 'Materio is awesome, and I particularly enjoy knowing that if I get stuck on something.',
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'Tommy haffman',
    position: 'Founder of Dribbble',
    avatarSrc: '/images/avatars/10.png'
  }
]

const CustomerReviews = () => {
  // Hooks
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        origin: 'auto'
      },
      breakpoints: {
        '(max-width: 1200px)': {
          slides: {
            perView: 2,
            spacing: 10,
            origin: 'auto'
          }
        },
        '(max-width: 900px)': {
          slides: {
            perView: 2,
            spacing: 10
          }
        },
        '(max-width: 600px)': {
          slides: {
            perView: 1,
            spacing: 10,
            origin: 'center'
          }
        }
      }
    },
    [
      slider => {
        let timeout
        const mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }

        slider.on('created', nextTimeout)
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <section className={classnames('flex flex-col gap-8 plb-[100px] bg-backgroundDefault', styles.sectionStartRadius)}>
      <div
        className={classnames('flex max-md:flex-col max-sm:flex-wrap is-full gap-6', frontCommonStyles.layoutSpacing)}
      >
        <div className='flex flex-col gap-1 bs-full justify-center items-center lg:items-start is-full md:is-[30%] mlb-auto sm:pbs-2'>
          <Chip label='Real Customers Reviews' variant='tonal' color='primary' size='small' className='mbe-3' />
          <div className='flex flex-col gap-y-1 flex-wrap max-lg:text-center '>
            <Typography color='text.primary' variant='h4'>
              <span className='relative z-[1] font-extrabold'>
                What people say
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[132%] inline-start-[-8%] block-start-[17px]'
                />
              </span>
            </Typography>
            <Typography>See what our customers have to say about their experience.</Typography>
          </div>
          <div className='flex gap-x-4 mbs-11'>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.prev()}>
              <i className='tabler-chevron-left' />
            </CustomIconButton>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.next()}>
              <i className='tabler-chevron-right' />
            </CustomIconButton>
          </div>
        </div>
        <div className='is-full md:is-[70%]'>
          <AppKeenSlider>
            <div ref={sliderRef} className='keen-slider mbe-6'>
              {data.map((item, index) => (
                <div key={index} className='keen-slider__slide flex p-4 sm:p-3'>
                  <Card elevation={8} className='flex items-start'>
                    <CardContent className='p-8 items-center mlb-auto'>
                      <div className='flex flex-col gap-4 items-start'>
                        {item.svg}
                        <Typography>{item.desc}</Typography>
                        <Rating value={item.rating} readOnly />
                        <div className='flex items-center gap-x-3'>
                          <CustomAvatar size={32} src={item.avatarSrc} alt={item.name} />
                          <div className='flex flex-col items-start'>
                            <Typography color='text.primary' className='font-medium'>
                              {item.name}
                            </Typography>
                            <Typography variant='body2' color='text.disabled'>
                              {item.position}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </AppKeenSlider>
        </div>
      </div>
      <Divider />
      <div className='flex flex-wrap items-center justify-center gap-x-16 gap-y-6 mli-3'>
        <Airbnb color='var(--mui-palette-text-secondary)' />
        <Netflix color='var(--mui-palette-text-secondary)' />
        <Dribbble color='var(--mui-palette-text-secondary)' />
        <Coinbase color='var(--mui-palette-text-secondary)' />
        <Pinterest color='var(--mui-palette-text-secondary)' />
      </div>
    </section>
  )
}

export default CustomerReviews
