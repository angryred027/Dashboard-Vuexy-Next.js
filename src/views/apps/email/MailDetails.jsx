// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'

// Slice Imports
import { moveEmailsToFolder, navigateEmails, toggleLabel } from '@/redux-store/slices/email'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomChip from '@core/components/mui/Chip'
import OptionMenu from '@core/components/option-menu'
import DirectionalIcon from '@components/DirectionalIcon'
import MailCard from './MailCard'

// Styles Imports
import styles from './styles.module.css'

// Data Imports
import { labelColors } from './SidebarLeft'

const ScrollWrapper = ({ children, isBelowLgScreen }) => {
  if (isBelowLgScreen) {
    return <div className='bs-full overflow-y-auto overflow-x-hidden bg-actionHover'>{children}</div>
  } else {
    return (
      <PerfectScrollbar className='bg-actionHover' options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    )
  }
}

const DetailsDrawer = styled('div')(({ drawerOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  blockSize: '100%',
  inlineSize: '100%',
  position: 'absolute',
  top: 0,
  right: drawerOpen ? 0 : '-100%',
  zIndex: 11,
  overflow: 'hidden',
  background: 'var(--mui-palette-background-paper)',
  transition: 'right 0.3s ease'
}))

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pli-6'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('tabler-bold', { 'text-textPrimary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('tabler-underline', { 'text-textPrimary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('tabler-italic', { 'text-textPrimary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('tabler-strikethrough', { 'text-textPrimary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i
          className={classnames('tabler-align-left', { 'text-textPrimary': !editor.isActive({ textAlign: 'left' }) })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('tabler-align-center', {
            'text-textPrimary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('tabler-align-right', {
            'text-textPrimary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('tabler-align-justified', {
            'text-textPrimary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

const MailDetails = props => {
  // Props
  const {
    drawerOpen,
    setDrawerOpen,
    isBelowSmScreen,
    isBelowLgScreen,
    currentEmail,
    emails,
    folder,
    label,
    dispatch,
    handleSingleEmailDelete,
    handleToggleIsReadStatus,
    handleToggleStarEmail
  } = props

  // States
  const [showReplies, setShowReplies] = useState(false)
  const [reply, setReply] = useState(false)

  // Handle navigation between emails and reset reply state
  const handleEmailNavigation = type => {
    dispatch(navigateEmails({ type, emails, currentEmailId: currentEmail?.id }))

    if (reply) {
      setReply(false)
    }
  }

  // Close drawer and reset reply state
  const handleCloseDrawer = () => {
    setDrawerOpen(false)

    if (reply) {
      setReply(false)
    }
  }

  // Move all selected emails to spam
  const handleMoveAllToSpam = () => {
    dispatch(moveEmailsToFolder({ emailIds: [currentEmail?.id], folder: 'spam' }))
    setDrawerOpen(false)
  }

  // Move all selected emails to inbox
  const handleMoveAllToInbox = () => {
    dispatch(moveEmailsToFolder({ emailIds: [currentEmail?.id], folder: 'inbox' }))
    setDrawerOpen(false)
  }

  // Handle click on label option from menu list
  const handleLabelClick = value => {
    dispatch(toggleLabel({ emailIds: [currentEmail?.id], label: value }))
    label === value && setDrawerOpen(false)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your message...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    immediatelyRender: false
  })

  return (
    <DetailsDrawer drawerOpen={drawerOpen}>
      {currentEmail && (
        <>
          <div className='plb-4 pli-6'>
            <div className='flex justify-between gap-2'>
              <div className='flex gap-2 items-center overflow-hidden'>
                <IconButton onClick={handleCloseDrawer}>
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-left'
                    rtlIconClass='tabler-chevron-right'
                    className='text-textSecondary'
                  />
                </IconButton>
                <div className='flex items-center flex-wrap gap-2 overflow-hidden'>
                  <Typography color='text.primary' noWrap>
                    {currentEmail.subject}
                  </Typography>
                  <div className='flex items-center flex-wrap gap-2'>
                    {currentEmail.labels && currentEmail.labels.length
                      ? currentEmail.labels.map(label => {
                          return (
                            <CustomChip
                              key={label}
                              variant='tonal'
                              round='true'
                              size='small'
                              label={label}
                              color={labelColors[label].color}
                              className='capitalize'
                            />
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <IconButton disabled={currentEmail.id === emails[0].id} onClick={() => handleEmailNavigation('prev')}>
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-left'
                    rtlIconClass='tabler-chevron-right'
                    className='text-textSecondary'
                  />
                </IconButton>
                <IconButton
                  disabled={currentEmail.id === emails[emails.length - 1].id}
                  onClick={() => handleEmailNavigation('next')}
                >
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-right'
                    rtlIconClass='tabler-chevron-left'
                    className='text-textSecondary'
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between gap-4 plb-2 pli-6 border-y'>
            <div className='flex gap-1'>
              <Tooltip title={folder === 'trash' ? 'Delete' : 'Move to trash'} placement='top'>
                <IconButton
                  onClick={e => {
                    setDrawerOpen(false)
                    handleSingleEmailDelete(e, currentEmail.id)
                  }}
                >
                  <i className='tabler-trash text-textSecondary' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Mark as unread' placement='top'>
                <IconButton
                  onClick={e => {
                    setDrawerOpen(false)
                    handleToggleIsReadStatus(e, currentEmail.id)
                  }}
                >
                  <i className='tabler-mail text-textSecondary' />
                </IconButton>
              </Tooltip>
              {folder === 'inbox' && (
                <Tooltip title='Move to spam' placement='top'>
                  <IconButton onClick={handleMoveAllToSpam}>
                    <i className='tabler-info-circle text-textSecondary' />
                  </IconButton>
                </Tooltip>
              )}
              {folder === 'spam' && (
                <Tooltip title='Move to inbox' placement='top'>
                  <IconButton onClick={handleMoveAllToInbox}>
                    <i className='tabler-inbox text-textSecondary' />
                  </IconButton>
                </Tooltip>
              )}
              {folder === 'trash' && (
                <OptionMenu
                  tooltipProps={{ title: 'Move to folder', placement: 'top' }}
                  icon={<i className='tabler-folder text-textSecondary' />}
                  iconButtonProps={{ size: 'medium' }}
                  options={[
                    {
                      text: 'Spam',
                      icon: <i className='tabler-info-circle' />,
                      menuItemProps: { onClick: handleMoveAllToSpam }
                    },
                    {
                      text: 'Inbox',
                      icon: <i className='tabler-inbox' />,
                      menuItemProps: { onClick: handleMoveAllToInbox }
                    }
                  ]}
                />
              )}
              <OptionMenu
                tooltipProps={{ title: 'Toggle label', placement: 'top' }}
                icon={<i className='tabler-tag text-textSecondary' />}
                iconButtonProps={{ size: 'medium' }}
                options={Object.entries(labelColors).map(([key, value]) => ({
                  text: key.charAt(0).toUpperCase() + key.slice(1),
                  menuItemProps: { onClick: () => handleLabelClick(key) },
                  icon: <i className={`tabler-circle-filled text-xs text-${value.color}`} />
                }))}
              />
            </div>
            <div className='flex gap-1'>
              <IconButton
                onClick={e => {
                  handleToggleStarEmail(e, currentEmail.id)
                  folder === 'starred' && setDrawerOpen(false)
                }}
              >
                <i
                  className={classnames('tabler-star', currentEmail.isStarred ? 'text-warning' : 'text-textSecondary')}
                />
              </IconButton>
              {currentEmail.replies.length ? (
                <IconButton onClick={() => setShowReplies(!showReplies)}>
                  <i
                    className={classnames('text-textSecondary', {
                      'tabler-arrows-move-vertical': !showReplies,
                      'tabler-fold': showReplies
                    })}
                  />
                </IconButton>
              ) : null}
              <IconButton>
                <i className='tabler-dots-vertical text-textSecondary' />
              </IconButton>
            </div>
          </div>
          <ScrollWrapper isBelowLgScreen={isBelowLgScreen}>
            <div className='plb-5 pli-8 flex flex-col gap-4'>
              {currentEmail.replies.length && !showReplies ? (
                <Typography className='self-center text-center cursor-pointer' onClick={() => setShowReplies(true)}>
                  {`${currentEmail.replies.length} Earlier Messages`}
                </Typography>
              ) : null}
              {showReplies
                ? currentEmail.replies.map(reply => <MailCard key={reply.id} data={reply} isReplies={false} />)
                : null}

              <div>
                {!showReplies && currentEmail.replies.length ? (
                  <>
                    <div
                      className={classnames(styles.mailReplyLayer, styles.layer1)}
                      onClick={() => setShowReplies(true)}
                    />
                    <div
                      className={classnames(styles.mailReplyLayer, styles.layer2)}
                      onClick={() => setShowReplies(true)}
                    />
                  </>
                ) : null}
                <MailCard data={currentEmail} isReplies={true} />
                <Card className='border mbs-4'>
                  {!reply ? (
                    <CardContent>
                      <Typography>
                        Click here to
                        <span className='text-primary cursor-pointer mli-1' onClick={() => setReply(true)}>
                          Reply
                        </span>
                        or
                        <span className='text-primary cursor-pointer mis-1'>Forward</span>
                      </Typography>
                    </CardContent>
                  ) : (
                    <div className='flex flex-col gap-y-6'>
                      <CardContent className='pbe-0'>
                        <Typography color='text.primary'>{`Reply to ${currentEmail.from.name}`}</Typography>
                      </CardContent>
                      <div>
                        <EditorToolbar editor={editor} />
                        <EditorContent editor={editor} className='overflow-y-auto' />
                      </div>
                      <CardActions className='flex items-center justify-end pbs-0'>
                        <IconButton>
                          <i className='tabler-trash text-textSecondary' onClick={() => setReply(false)} />
                        </IconButton>
                        {isBelowSmScreen ? (
                          <CustomIconButton color='secondary'>
                            <i className='tabler-paperclip text-textPrimary' />
                          </CustomIconButton>
                        ) : (
                          <Button color='secondary' startIcon={<i className='tabler-paperclip text-textPrimary' />}>
                            Attachments
                          </Button>
                        )}
                        {isBelowSmScreen ? (
                          <CustomIconButton variant='contained' color='primary'>
                            <i className='tabler-send' />
                          </CustomIconButton>
                        ) : (
                          <Button variant='contained' color='primary' endIcon={<i className='tabler-send' />}>
                            Send
                          </Button>
                        )}
                      </CardActions>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </ScrollWrapper>
        </>
      )}
    </DetailsDrawer>
  )
}

export default MailDetails
