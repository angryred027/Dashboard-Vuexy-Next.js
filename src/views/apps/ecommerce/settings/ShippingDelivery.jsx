// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Vars
const domesticTableData = [
  { rate: 'Weight', condition: '5Kg-10Kg', price: '$9' },
  { rate: 'VAT', condition: '12%', price: '$25' },
  { rate: 'Duty', condition: '-', price: '-' }
]

const internationalTableData = [
  { rate: 'Weight', condition: '5Kg-10Kg', price: '$19' },
  { rate: 'VAT', condition: '12%', price: '$25' },
  { rate: 'Duty', condition: 'Japan', price: '$49' }
]

const ShippingRateCard = props => {
  // Props
  const { title, avatar, data } = props

  return (
    <div className='flex flex-col items-start gap-4'>
      <div className='flex items-center gap-2 is-full'>
        <CustomAvatar src={avatar} size={34} />
        <div className='flex-auto'>
          <Typography className='font-medium' color='text.primary'>
            {title}
          </Typography>
          <Typography variant='body2'>United states of America</Typography>
        </div>
        <IconButton color='secondary' size='small'>
          <i className='tabler-pencil' />
        </IconButton>
        <IconButton color='secondary' size='small'>
          <i className='tabler-trash' />
        </IconButton>
      </div>
      <div className='is-full border rounded overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead className='border-0'>
            <tr>
              <th>Rate Name</th>
              <th>Condition</th>
              <th>Price</th>
              <th className='is-[100px]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
                <td>{data.rate}</td>
                <td>{data.condition}</td>
                <td>{data.price}</td>
                <td className='is-[100px]'>
                  <OptionMenu
                    iconButtonProps={{ size: 'medium' }}
                    iconClassName='text-textSecondary text-[22px]'
                    options={[
                      { text: 'Edit', icon: 'tabler-edit' },
                      { text: 'Delete', icon: 'tabler-trash' }
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant='tonal' size='small'>
        Add Rate
      </Button>
    </div>
  )
}

const ShippingDelivery = () => {
  return (
    <Card>
      <CardHeader
        title='Shipping zones'
        subheader='Choose where you ship and how much you charge for shipping at checkout.'
        action={
          <Typography component={Link} color='primary.main' className='font-medium'>
            Create zone
          </Typography>
        }
        sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
      />
      <CardContent className='flex flex-col gap-6'>
        <ShippingRateCard title='Domestic' avatar='/images/avatars/1.png' data={domesticTableData} />
        <ShippingRateCard title='International' avatar='/images/cards/us.png' data={internationalTableData} />
      </CardContent>
    </Card>
  )
}

export default ShippingDelivery
