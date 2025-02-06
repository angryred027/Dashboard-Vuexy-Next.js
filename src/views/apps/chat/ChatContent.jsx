// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import AvatarWithBadge from './AvatarWithBadge'
import { statusObj } from './SidebarLeft'
import ChatLog from './ChatLog'
import SendMsgForm from './SendMsgForm'
import UserProfileRight from './UserProfileRight'
import CustomAvatar from '@core/components/mui/Avatar'

// Renders the user avatar with badge and user information
const UserAvatar = ({ activeUser, setUserProfileLeftOpen, setBackdropOpen }) => (
  <div
    className='flex items-center gap-4 cursor-pointer'
    onClick={() => {
      setUserProfileLeftOpen(true)
      setBackdropOpen(true)
    }}
  >
    <AvatarWithBadge
      alt={activeUser?.fullName}
      src={activeUser?.avatar}
      color={activeUser?.avatarColor}
      badgeColor={statusObj[activeUser?.status || 'offline']}
    />
    <div>
      <Typography color='text.primary'>{activeUser?.fullName}</Typography>
      <Typography variant='body2'>{activeUser?.role}</Typography>
    </div>
  </div>
)

const ChatContent = props => {
  // Props
  const {
    chatStore,
    dispatch,
    backdropOpen,
    setBackdropOpen,
    setSidebarOpen,
    isBelowMdScreen,
    isBelowSmScreen,
    isBelowLgScreen,
    messageInputRef
  } = props

  // States
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false)

  // Vars
  const { activeUser } = chatStore

  useEffect(() => {
    if (!backdropOpen && userProfileRightOpen) {
      setUserProfileRightOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backdropOpen])

  return !chatStore.activeUser ? (
    <CardContent className='flex flex-col flex-auto items-center justify-center bs-full gap-[18px] bg-backgroundChat'>
      <CustomAvatar variant='circular' size={98} color='primary' skin='light'>
        <i className='tabler-message-2 text-[50px]' />
      </CustomAvatar>
      <Typography className='text-center'>Select a contact to start a conversation.</Typography>
      {isBelowMdScreen && (
        <Button
          variant='contained'
          className='rounded-full'
          onClick={() => {
            setSidebarOpen(true)
            isBelowSmScreen ? setBackdropOpen(false) : setBackdropOpen(true)
          }}
        >
          Select Contact
        </Button>
      )}
    </CardContent>
  ) : (
    <>
      {activeUser && (
        <div className='flex flex-col flex-grow bs-full bg-backgroundChat'>
          <div className='flex items-center justify-between border-be plb-[17px] pli-6 bg-backgroundPaper'>
            {isBelowMdScreen ? (
              <div className='flex items-center gap-4'>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSidebarOpen(true)
                    setBackdropOpen(true)
                  }}
                >
                  <i className='tabler-menu-2' />
                </IconButton>
                <UserAvatar
                  activeUser={activeUser}
                  setBackdropOpen={setBackdropOpen}
                  setUserProfileLeftOpen={setUserProfileRightOpen}
                />
              </div>
            ) : (
              <UserAvatar
                activeUser={activeUser}
                setBackdropOpen={setBackdropOpen}
                setUserProfileLeftOpen={setUserProfileRightOpen}
              />
            )}
            {isBelowMdScreen ? (
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-secondary'
                options={[
                  {
                    text: 'View Contact',
                    menuItemProps: {
                      onClick: () => {
                        setUserProfileRightOpen(true)
                        setBackdropOpen(true)
                      }
                    }
                  },
                  'Mute Notifications',
                  'Block Contact',
                  'Clear Chat',
                  'Block'
                ]}
              />
            ) : (
              <div className='flex items-center gap-1'>
                <IconButton color='secondary'>
                  <i className='tabler-phone' />
                </IconButton>
                <IconButton color='secondary'>
                  <i className='tabler-video' />
                </IconButton>
                <IconButton color='secondary'>
                  <i className='tabler-search' />
                </IconButton>
                <OptionMenu
                  iconButtonProps={{ size: 'medium' }}
                  iconClassName='text-secondary'
                  options={[
                    {
                      text: 'View Contact',
                      menuItemProps: {
                        onClick: () => {
                          setUserProfileRightOpen(true)
                          setBackdropOpen(true)
                        }
                      }
                    },
                    'Mute Notifications',
                    'Block Contact',
                    'Clear Chat',
                    'Block'
                  ]}
                />
              </div>
            )}
          </div>

          <ChatLog
            chatStore={chatStore}
            isBelowMdScreen={isBelowMdScreen}
            isBelowSmScreen={isBelowSmScreen}
            isBelowLgScreen={isBelowLgScreen}
          />

          <SendMsgForm
            dispatch={dispatch}
            activeUser={activeUser}
            isBelowSmScreen={isBelowSmScreen}
            messageInputRef={messageInputRef}
          />
        </div>
      )}

      {activeUser && (
        <UserProfileRight
          open={userProfileRightOpen}
          handleClose={() => {
            setUserProfileRightOpen(false)
            setBackdropOpen(false)
          }}
          activeUser={activeUser}
          isBelowSmScreen={isBelowSmScreen}
          isBelowLgScreen={isBelowLgScreen}
        />
      )}
    </>
  )
}

export default ChatContent
