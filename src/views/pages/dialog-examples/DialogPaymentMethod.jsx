// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import PaymentMethod from '@components/dialogs/payment-method'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const DialogPaymentMethod = () => {
  // Vars
  const buttonProps = {
    variant: 'contained',
    children: 'Show'
  }

  return (
    <Card>
      <CardContent className='flex flex-col items-center text-center gap-4'>
        <i className='tabler-credit-card text-[34px] text-textPrimary' />
        <Typography variant='h5'>Add Payment Method</Typography>
        <Typography color='text.primary'>
          Elegant payment methods modal popup example, easy to use in any page.
        </Typography>
        <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={PaymentMethod} />
      </CardContent>
    </Card>
  )
}

export default DialogPaymentMethod
