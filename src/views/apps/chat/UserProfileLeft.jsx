// React Imports
import { useState } from 'react'

// MUI Import
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Switch from '@mui/material/Switch'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'

// Third Party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Slice Imports
import { setUserStatus } from '@/redux-store/slices/chat'

// Component Imports
import AvatarWithBadge from './AvatarWithBadge'
import { statusObj } from '@views/apps/chat/SidebarLeft'
import CustomTextField from '@core/components/mui/TextField'

const ScrollWrapper = ({ children, isBelowLgScreen }) => {
  if (isBelowLgScreen) {
    return <div className='bs-full overflow-x-hidden overflow-y-auto'>{children}</div>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const UserProfileLeft = props => {
  // Props
  const { userSidebar, setUserSidebar, profileUserData, dispatch, isBelowLgScreen, isBelowSmScreen } = props

  // States
  const [twoStepVerification, setTwoStepVerification] = useState(true)
  const [notification, setNotification] = useState(false)

  const handleTwoStepVerification = () => {
    setTwoStepVerification(!twoStepVerification)
  }

  const handleNotification = () => {
    setNotification(!notification)
  }

  const handleUserStatus = e => {
    dispatch(setUserStatus({ status: e.target.value }))
  }

  return profileUserData ? (
    <>
      <Drawer
        open={userSidebar}
        anchor='left'
        variant='persistent'
        ModalProps={{ keepMounted: true }}
        onClose={() => setUserSidebar(false)}
        sx={{
          zIndex: 13,
          '& .MuiDrawer-paper': { width: isBelowSmScreen ? '100%' : '370px', position: 'absolute', border: 0 }
        }}
      >
        <IconButton className='absolute block-start-4 inline-end-4' onClick={() => setUserSidebar(false)}>
          <i className='tabler-x text-2xl' />
        </IconButton>
        <div className='flex flex-col justify-center items-center gap-4 mbs-6 pli-6 pbs-6 pbe-3'>
          <AvatarWithBadge
            alt={profileUserData.fullName}
            src={profileUserData.avatar}
            badgeColor={statusObj[profileUserData.status]}
            className='bs-[84px] is-[84px]'
            badgeSize={12}
          />
          <div className='text-center'>
            <Typography variant='h5'>{profileUserData.fullName}</Typography>
            <Typography>{profileUserData.role}</Typography>
          </div>
        </div>
        <ScrollWrapper isBelowLgScreen={isBelowLgScreen}>
          <div className='flex flex-col gap-6 p-6 pbs-3'>
            <div className='flex flex-col gap-1'>
              <Typography className='uppercase' color='text.disabled'>
                About
              </Typography>
              <CustomTextField fullWidth rows={3} multiline id='about-textarea' defaultValue={profileUserData.about} />
            </div>
            <div className='flex flex-col gap-1'>
              <FormLabel id='status-radio-buttons-group-label' className='uppercase text-textDisabled'>
                Status
              </FormLabel>
              <RadioGroup
                value={profileUserData.status}
                name='radio-buttons-group'
                onChange={handleUserStatus}
                aria-labelledby='status-radio-buttons-group-label'
              >
                <FormControlLabel value='online' control={<Radio color='success' />} label='Online' />
                <FormControlLabel value='away' control={<Radio color='warning' />} label='Away' />
                <FormControlLabel value='busy' control={<Radio color='error' />} label='Do not disturb' />
                <FormControlLabel value='offline' control={<Radio color='secondary' />} label='Offline' />
              </RadioGroup>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography className='uppercase' color='text.disabled'>
                Settings
              </Typography>
              <List className='plb-0'>
                <ListItem
                  disablePadding
                  secondaryAction={<Switch checked={twoStepVerification} onChange={handleTwoStepVerification} />}
                >
                  <ListItemButton onClick={handleTwoStepVerification} className='p-2'>
                    <ListItemIcon>
                      <i className='tabler-lock' />
                    </ListItemIcon>
                    <ListItemText primary='Two-step Verification' />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  secondaryAction={<Switch checked={notification} onChange={handleNotification} />}
                >
                  <ListItemButton onClick={handleNotification} className='p-2'>
                    <ListItemIcon>
                      <i className='tabler-bell' />
                    </ListItemIcon>
                    <ListItemText primary='Notification' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton className='p-2'>
                    <ListItemIcon>
                      <i className='tabler-user-plus' />
                    </ListItemIcon>
                    <ListItemText primary='Invite Friends' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton className='p-2'>
                    <ListItemIcon>
                      <i className='tabler-trash' />
                    </ListItemIcon>
                    <ListItemText primary='Delete Account' />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
            <Button variant='contained' fullWidth className='mbs-auto' endIcon={<i className='tabler-logout' />}>
              Logout
            </Button>
          </div>
        </ScrollWrapper>
      </Drawer>
      <Backdrop open={userSidebar} onClick={() => setUserSidebar(false)} className='absolute z-[12]' />
    </>
  ) : null
}

export default UserProfileLeft
