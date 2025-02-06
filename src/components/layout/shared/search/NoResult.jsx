// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const noResultData = [
  {
    label: 'Analytics',
    href: '/dashboards/analytics',
    icon: 'tabler-chart-pie-2'
  },
  {
    label: 'User Profile',
    href: '/pages/user-profile',
    icon: 'tabler-user'
  },
  {
    label: 'CRM',
    href: '/dashboards/crm',
    icon: 'tabler-chart-donut-3'
  }
]

const NoResult = ({ searchValue, setOpen }) => {
  // Hooks
  const { lang: locale } = useParams()

  return (
    <div className='flex items-center justify-center grow flex-wrap plb-14 pli-16 overflow-y-auto overflow-x-hidden bs-full'>
      <div className='flex flex-col items-center'>
        <i className='tabler-file-alert text-[64px] mbe-2.5' />
        <p className='text-lg font-medium leading-[1.55556] mbe-11'>{`No result for "${searchValue}"`}</p>
        <p className='text-[15px] leading-[1.4667] mbe-4 text-textDisabled'>Try searching for</p>
        <ul className='flex flex-col self-start gap-[18px]'>
          {noResultData.map((item, index) => (
            <li key={index} className='flex items-center'>
              <Link
                href={getLocalizedUrl(item.href, locale)}
                className='flex items-center gap-2 hover:text-primary focus-visible:text-primary focus-visible:outline-0'
                onClick={() => setOpen(false)}
              >
                <i className={classnames(item.icon, 'text-xl')} />
                <p className='text-[15px] leading-[1.4667] truncate'>{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NoResult
