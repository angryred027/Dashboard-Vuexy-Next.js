'use client'

// React Imports
import { useState, useEffect } from 'react'

// Component Imports
import Faqs from './Faqs';
import ContactUs from './ContactUs';

import { useSettings } from '@core/hooks/useSettings'

const SupportWrapper = () => {
  // States
  const [searchValue, setSearchValue] = useState('')

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
    <>
      <Faqs />
      <ContactUs />
    </>
  )
}

export default SupportWrapper
