// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Components Imports
import ComposeMail from './ComposeMail'
import CustomChip from '@core/components/mui/Chip'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styles Imports
import styles from './styles.module.css'

// Constants
const icons = {
  inbox: 'tabler-mail',
  sent: 'tabler-send',
  draft: 'tabler-edit',
  starred: 'tabler-star',
  spam: 'tabler-alert-octagon',
  trash: 'tabler-trash'
}

export const labelColors = {
  personal: { color: 'success', colorClass: 'text-success' },
  company: { color: 'primary', colorClass: 'text-primary' },
  important: { color: 'warning', colorClass: 'text-warning' },
  private: { color: 'error', colorClass: 'text-error' }
}

const ScrollWrapper = ({ children, isBelowLgScreen }) => {
  if (isBelowLgScreen) {
    return <div className='bs-full overflow-y-auto overflow-x-hidden'>{children}</div>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const SidebarLeft = props => {
  // Props
  const {
    store,
    isBelowLgScreen,
    isBelowMdScreen,
    isBelowSmScreen,
    sidebarOpen,
    setSidebarOpen,
    uniqueLabels,
    folder,
    label
  } = props

  // States
  const [openCompose, setOpenCompose] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  const folderCounts = store.emails.reduce((counts, email) => {
    if (!email.isRead && email.folder !== 'trash') {
      counts[email.folder] = (counts[email.folder] || 0) + 1
    } else if (email.folder === 'draft') {
      counts.draft = (counts.draft || 0) + 1
    }

    return counts
  }, {})

  return (
    <>
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className='bs-full'
        variant={!isBelowMdScreen ? 'permanent' : 'persistent'}
        ModalProps={{ disablePortal: true, keepMounted: true }}
        sx={{
          zIndex: isBelowMdScreen && sidebarOpen ? 11 : 10,
          position: !isBelowMdScreen ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            overflow: 'hidden',
            width: '260px',
            position: !isBelowMdScreen ? 'static' : 'absolute'
          }
        }}
      >
        <CardContent>
          <Button color='primary' variant='contained' fullWidth onClick={() => setOpenCompose(true)}>
            Compose
          </Button>
        </CardContent>
        <ScrollWrapper isBelowLgScreen={isBelowLgScreen}>
          <div className='flex flex-col gap-1 plb-4'>
            {Object.entries(icons).map(([key, value]) => (
              <Link
                key={key}
                href={getLocalizedUrl(`/apps/email/${key}`, locale)}
                prefetch
                className={classnames('flex items-center justify-between plb-1 pli-6 gap-2.5 min-bs-8 cursor-pointer', {
                  [styles.activeSidebarListItem]: key === folder && !label
                })}
              >
                <div className='flex items-center gap-2.5'>
                  <i className={classnames(value, 'text-xl')} />
                  <Typography className='capitalize' color='inherit'>
                    {key}
                  </Typography>
                </div>
                {folderCounts[key] && (
                  <CustomChip
                    label={folderCounts[key]}
                    size='small'
                    round='true'
                    variant='tonal'
                    color={
                      key === 'inbox' ? 'primary' : key === 'draft' ? 'warning' : key === 'spam' ? 'error' : 'default'
                    }
                  />
                )}
              </Link>
            ))}
          </div>
          <div className='flex flex-col gap-4 plb-4'>
            <Typography variant='caption' className='uppercase pli-6'>
              Labels
            </Typography>
            <div className='flex flex-col gap-3'>
              {uniqueLabels.map(labelName => (
                <Link
                  key={labelName}
                  href={getLocalizedUrl(`/apps/email/label/${labelName}`, locale)}
                  prefetch
                  className={classnames('flex items-center gap-x-2 pli-6 cursor-pointer', {
                    [styles.activeSidebarListItem]: labelName === label
                  })}
                >
                  <i className={classnames('tabler-circle-filled text-xs', labelColors[labelName].colorClass)} />
                  <Typography className='capitalize' color='inherit'>
                    {labelName}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
        </ScrollWrapper>
      </Drawer>
      <ComposeMail
        openCompose={openCompose}
        setOpenCompose={setOpenCompose}
        isBelowSmScreen={isBelowSmScreen}
        isBelowMdScreen={isBelowMdScreen}
      />
    </>
  )
}

export default SidebarLeft
