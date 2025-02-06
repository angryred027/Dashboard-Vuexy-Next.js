// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import BillingCard from '@components/dialogs/billing-card'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const DialogAddCard = () => {
  // Vars
  const buttonProps = {
    variant: 'contained',
    children: 'Show'
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col items-center text-center gap-4'>
          <i className='tabler-credit-card text-[34px] text-textPrimary' />
          <Typography variant='h5'>Add New Card</Typography>
          <Typography color='text.primary'>
            Quickly collect the credit card details, built in input mask and form validation support.
          </Typography>
          <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={BillingCard} />
        </CardContent>
      </Card>
    </>
  )
}

export default DialogAddCard
