// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import PaymentProviders from '@components/dialogs/payment-providers'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const DialogPaymentProviders = () => {
  // Vars
  const buttonProps = {
    variant: 'contained',
    children: 'Show'
  }

  return (
    <Card>
      <CardContent className='flex flex-col items-center text-center gap-4'>
        <i className='tabler-device-imac-dollar text-[34px] text-textPrimary' />
        <Typography variant='h5'>Payment providers</Typography>
        <Typography color='text.primary'>
          Elegant payment options modal popup example, easy to use in any page.
        </Typography>
        <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={PaymentProviders} />
      </CardContent>
    </Card>
  )
}

export default DialogPaymentProviders
