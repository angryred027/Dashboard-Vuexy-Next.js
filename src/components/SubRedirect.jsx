'use client'

// Next Imports
import { redirect } from 'next/navigation'

// Config Imports


const SubRedirect = ({ lang }) => {

  // ℹ️ Bring me `lang`
  const redirectUrl = `/${lang}/subscription`

  return redirect(redirectUrl)
}

export default SubRedirect
