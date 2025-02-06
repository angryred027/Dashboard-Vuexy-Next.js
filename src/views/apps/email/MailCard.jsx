// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Styles Imports
import styles from './styles.module.css'

const CardHeaderAction = ({ data, isReplies }) => {
  return (
    <div className='flex items-center gap-4'>
      <Typography color='text.disabled'>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date(data.time))}
      </Typography>
      <div className='flex items-center gap-1'>
        {data.attachments.length ? (
          <IconButton>
            <i className='tabler-paperclip text-textSecondary' />
          </IconButton>
        ) : null}
        {isReplies ? (
          <OptionMenu
            iconClassName='text-textSecondary'
            iconButtonProps={{ size: 'medium' }}
            options={[
              { text: 'Reply', icon: 'tabler-arrow-back-up' },
              { text: 'Forward', icon: 'tabler-arrow-forward-up' }
            ]}
          />
        ) : (
          <IconButton>
            <i className='tabler-dots-vertical text-textSecondary' />
          </IconButton>
        )}
      </div>
    </div>
  )
}

const MailCard = ({ data, isReplies }) => {
  return (
    <Card className='border'>
      <CardContent className='flex is-full gap-4'>
        <CustomAvatar src={data.from.avatar} size={38} alt={data.from.name} />
        <div className='flex items-center justify-between flex-wrap grow gap-x-4 gap-y-2'>
          <div className='flex flex-col'>
            <Typography color='text.primary'>{data.from.name}</Typography>
            <Typography variant='body2'>{data.from.email}</Typography>
          </div>
          <CardHeaderAction data={data} isReplies={isReplies} />
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <div
          className={classnames('text-textSecondary', styles.message)}
          dangerouslySetInnerHTML={{ __html: data.message }}
        />
        {data.attachments.length ? (
          <div className='flex flex-col gap-4'>
            <hr className='border-be -mli-6 mbs-4' />
            <Typography variant='caption'>Attachments</Typography>
            {data.attachments.map(attachment => (
              <div key={attachment.fileName} className='flex items-center gap-2'>
                <img src={attachment.thumbnail} alt={attachment.fileName} className='bs-6' />
                <Typography>{attachment.fileName}</Typography>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default MailCard
