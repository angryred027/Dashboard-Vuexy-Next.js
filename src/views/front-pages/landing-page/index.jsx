'use client'

// React Imports
import { useEffect } from 'react'

// Component Imports
import HeroSection from './HeroSection'
import UsefulFeature from './UsefulFeature'
import CustomerReviews from './CustomerReviews'
import OurTeam from './OurTeam'
import Pricing from './Pricing'
import ProductStat from './ProductStat'
import Faqs from './Faqs'
import GetStarted from './GetStarted'
import ContactUs from './ContactUs'
import { useSettings } from '@core/hooks/useSettings'

const LandingPageWrapper = ({ mode }) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-backgroundPaper'>
      <HeroSection mode={mode} />
      <UsefulFeature />
      <CustomerReviews />
      <OurTeam />
      <Pricing />
      <ProductStat />
      <Faqs />
      <GetStarted mode={mode} />
      <ContactUs />
    </div>
  )
}

export default LandingPageWrapper
