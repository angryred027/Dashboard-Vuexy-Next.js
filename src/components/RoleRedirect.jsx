'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const RoleRedirect = ({ lang }) => {

  // ℹ️ Bring me `lang`
  const redirectUrl = `/${lang}/unauthorized`

  return redirect(redirectUrl)
}

export default RoleRedirect
