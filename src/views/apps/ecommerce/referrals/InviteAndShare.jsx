// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const InviteAndShare = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-[1.11937rem]'>
        <div>
          <Typography variant='h5' className='mbe-5'>
            Invite your friends
          </Typography>
          <div className='flex items-end gap-4'>
            <CustomTextField
              label="Enter friend's email address & invite them"
              placeholder='Email Address'
              className='flex-auto'
            />
            <Button variant='contained' className='min-is-fit'>
              Submit
            </Button>
          </div>
        </div>
        <div>
          <Typography variant='h5' className='mbe-5'>
            Share the referral link
          </Typography>
          <div className='flex items-end gap-4'>
            <CustomTextField
              label='Share referral link in social media'
              placeholder='pixinvent.com/?ref=6479'
              className='flex-auto'
            />
            <div className='flex gap-2'>
              <CustomIconButton variant='contained' className='bg-facebook text-white'>
                <i className='tabler-brand-facebook' />
              </CustomIconButton>
              <CustomIconButton variant='contained' className='bg-twitter text-white'>
                <i className='tabler-brand-twitter' />
              </CustomIconButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InviteAndShare
