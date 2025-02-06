// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomIconButton from '@core/components/mui/IconButton'
import Link from '@components/Link'

const ConnectionsTeams = props => {
  // props
  const { teamsTech, connections } = props

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader
            title='Connections'
            action={<OptionMenu options={['Share Connections', 'Suggest Edits', { divider: true }, 'Report Bug']} />}
          />
          <CardContent className='flex flex-col gap-4'>
            {connections &&
              connections.map((connection, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div className='flex items-center flex-grow gap-2'>
                    <CustomAvatar src={connection.avatar} size={38} />
                    <div className='flex flex-grow flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {connection.name}
                      </Typography>
                      <Typography variant='body2'>{connection.connections} Connections</Typography>
                    </div>
                  </div>
                  <CustomIconButton color='primary' variant={connection.isFriend ? 'tonal' : 'contained'}>
                    <i className={connection.isFriend ? 'tabler-user-check' : 'tabler-user-x'} />
                  </CustomIconButton>
                </div>
              ))}
          </CardContent>
          <CardActions className='flex justify-center'>
            <Typography component={Link} color='primary.main'>
              View all connections
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader
            title='Teams'
            action={<OptionMenu options={['Share Teams', 'Suggest Edits', { divider: true }, 'Report Bug']} />}
          />
          <CardContent className='flex flex-col gap-4'>
            {teamsTech &&
              teamsTech.map((team, index) => (
                <div key={index} className='flex'>
                  <div className='flex flex-grow  items-center gap-2'>
                    <CustomAvatar src={team.avatar} size={38} />
                    <div className='flex flex-grow flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {team.title}
                      </Typography>
                      <Typography variant='body2'>{team.members} Members</Typography>
                    </div>
                  </div>
                  <Chip color={team.ChipColor} label={team.chipText} size='small' variant='tonal' />
                </div>
              ))}
          </CardContent>
          <CardActions className='flex justify-center'>
            <Typography component={Link} color='primary.main'>
              View all teams
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default ConnectionsTeams
