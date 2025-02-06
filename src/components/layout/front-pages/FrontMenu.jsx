'use client'

// React Imports
import { useEffect } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// Component Imports
import DropdownMenu from './DropdownMenu'

const Wrapper = props => {
  // Props
  const { children, isBelowLgScreen, className, isDrawerOpen, setIsDrawerOpen } = props

  if (isBelowLgScreen) {
    return (
      <Drawer
        variant='temporary'
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{
          keepMounted: true
        }}
        sx={{ '& .MuiDrawer-paper': { width: ['100%', 300] } }}
        className={classnames('p-5', className)}
      >
        <div className='p-4 flex flex-col gap-x-3'>
          <IconButton onClick={() => setIsDrawerOpen(false)} className='absolute inline-end-4 block-start-2'>
            <i className='tabler-x' />
          </IconButton>
          {children}
        </div>
      </Drawer>
    )
  }

  return <div className={classnames('flex items-center flex-wrap gap-x-4 gap-y-3', className)}>{children}</div>
}

const FrontMenu = props => {
  // Props
  const { isDrawerOpen, setIsDrawerOpen, mode } = props

  // Hooks
  const pathname = usePathname()
  const isBelowLgScreen = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { intersections } = useIntersection()

  useEffect(() => {
    if (!isBelowLgScreen && isDrawerOpen) {
      setIsDrawerOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBelowLgScreen])

  return (
    <Wrapper isBelowLgScreen={isBelowLgScreen} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
      <Typography
        color='text.primary'
        component={Link}
        href='/front-pages/landing-page'
        className={classnames('font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary':
            !intersections.features &&
            !intersections.team &&
            !intersections.faq &&
            !intersections['contact-us'] &&
            pathname === '/front-pages/landing-page'
        })}
      >
        Home
      </Typography>
      <Typography
        color='text.primary'
        component={Link}
        href='/front-pages/landing-page#features'
        className={classnames('font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary': intersections.features
        })}
      >
        Features
      </Typography>
      <Typography
        color='text.primary'
        component={Link}
        href='/front-pages/landing-page#team'
        className={classnames('font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary': intersections.team
        })}
      >
        Team
      </Typography>
      <Typography
        color='text.primary'
        component={Link}
        href='/front-pages/landing-page#faq'
        className={classnames('font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary': intersections.faq
        })}
      >
        FAQ
      </Typography>
      <Typography
        color='text.primary'
        component={Link}
        href='/front-pages/landing-page#contact-us'
        className={classnames('font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary': intersections['contact-us']
        })}
      >
        Contact us
      </Typography>
      <DropdownMenu
        mode={mode}
        isBelowLgScreen={isBelowLgScreen}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <Typography
        component={Link}
        color='text.primary'
        href='/'
        target='_blank'
        className='font-medium plb-3 pli-1.5 hover:text-primary'
      >
        Admin
      </Typography>
    </Wrapper>
  )
}

export default FrontMenu
