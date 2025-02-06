// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import AddNewAddress from '@components/dialogs/add-edit-address'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const propData = [
  {
    typeOfAddress: 'Home',
    isDefaultAddress: true,
    name: 'Violet Mendoza',
    streetAddress: '23 Shatinon Mekalan',
    area: 'Melbourne, VIC 3000,',
    city: 'London'
  },
  {
    typeOfAddress: 'Office',
    isDefaultAddress: false,
    name: 'Archie Mendoza',
    streetAddress: '45 Roker Terrace',
    area: 'Latheronwheel',
    city: 'London'
  },
  {
    typeOfAddress: 'Family',
    isDefaultAddress: false,
    name: 'George Mendoza',
    streetAddress: '512 Water Plant',
    area: 'Melbourne, VIC 3000',
    city: 'London'
  }
]

// Vars
const data = {
  firstName: 'Violet',
  lastName: 'Mendoza',
  email: 'sbaser0@boston.com',
  country: 'UK',
  address1: '23 Shatinon Mekalan',
  address2: 'Melbourne, VIC 3000',
  landmark: 'Near Water Plant',
  city: 'London',
  state: 'Capholim',
  zipCode: '403114',
  taxId: 'TAX-875623',
  vatNumber: 'SDF754K77',
  contact: '+1 (234) 464-0600'
}

const CustomerAddress = props => {
  // Props
  const { typeOfAddress, isDefaultAddress, name, streetAddress, area, city } = props

  // States
  const [expanded, setExpanded] = useState(isDefaultAddress ? true : false)

  // Vars
  const iconButtonProps = {
    children: <i className='tabler-edit' />,
    className: 'text-textSecondary'
  }

  // Hooks
  const theme = useTheme()

  return (
    <>
      <div className='flex flex-wrap justify-between items-center mlb-3 gap-y-2'>
        <div className='flex items-center gap-2'>
          <IconButton
            size='large'
            sx={{
              '& i': {
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(0deg)' : theme.direction === 'ltr' ? 'rotate(-90deg)' : 'rotate(90deg)'
              }
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <i className='tabler-chevron-down text-textPrimary' />
          </IconButton>
          <div className='flex flex-col items-start gap-1'>
            <div className='flex items-center gap-2'>
              <Typography color='text.primary' className='font-medium'>
                {typeOfAddress}
              </Typography>
              {isDefaultAddress && <Chip variant='tonal' color='success' label='Default Address' size='small' />}
            </div>
            <Typography>{streetAddress}</Typography>
          </div>
        </div>
        <div className='mis-10'>
          <OpenDialogOnElementClick
            element={IconButton}
            elementProps={iconButtonProps}
            dialog={AddNewAddress}
            dialogProps={{ data }}
          />
          <IconButton>
            <i className='tabler-trash text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            iconButtonProps={{ size: 'medium' }}
            options={['Set as Default Address']}
          />
        </div>
      </div>
      <Collapse in={expanded} timeout={300}>
        <div className='flex flex-col gap-1 pb-3 pis-14'>
          <Typography color='text.primary' className='font-medium'>
            {name}
          </Typography>
          <div>
            <Typography>{streetAddress}</Typography>
            <Typography>{area}</Typography>
            <Typography>{city}</Typography>
          </div>
        </div>
      </Collapse>
    </>
  )
}

const AddressBook = () => {
  // Vars
  const buttonProps = {
    variant: 'tonal',
    children: 'Add New Address',
    size: 'small'
  }

  return (
    <Card>
      <CardHeader
        title='Address Book'
        action={<OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={AddNewAddress} />}
      />
      <CardContent>
        {propData.map((address, index) => (
          <div key={index}>
            <CustomerAddress {...address} />
            {index !== propData.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default AddressBook
