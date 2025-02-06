// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const features = [
  {
    feature: '14-days free trial',
    starter: true,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'No user limit',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Product Support',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Email Support',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: true,
      enterprise: false
    }
  },
  {
    feature: 'Integrations',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Removal of Front branding',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: true,
      enterprise: false
    }
  },
  {
    feature: 'Active maintenance & support',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Data storage for 365 days',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  }
]

const plans = [
  { variant: 'tonal', label: 'Choose Plan', plan: 'starter' },
  { variant: 'contained', label: 'Choose Plan', plan: 'pro' },
  { variant: 'tonal', label: 'Choose Plan', plan: 'enterprise' }
]

const Plans = () => {
  return (
    <section className='md:plb-[100px] plb-[50px] bg-backgroundPaper'>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col text-center gap-2 mbe-6'>
          <Typography variant='h3'>Pick a plan that works best for you</Typography>
          <Typography>Stay cool, we have a 48-hour money back guarantee!</Typography>
        </div>
        <div className='overflow-x-auto border-x border-be rounded'>
          <table className={tableStyles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <>FEATURES</>
                  <Typography variant='body2' className='capitalize'>
                    Native Front Features
                  </Typography>
                </th>
                <th>
                  <>STARTER</>
                  <Typography variant='body2' className='capitalize'>
                    Free
                  </Typography>
                </th>
                <th>
                  <div className='flex justify-center gap-x-2'>
                    <>Pro</>
                    <CustomAvatar size={20} color='primary'>
                      <i className='tabler-star text-[14px]' />
                    </CustomAvatar>
                  </div>
                  <Typography variant='body2' className='capitalize'>
                    $7.5/Month
                  </Typography>
                </th>
                <th>
                  <>ENTERPRISE</>
                  <Typography variant='body2' className='capitalize'>
                    $16/Month
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody className={classnames('border-be', styles.tableBody)}>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td>
                    <Typography color='text.primary'>{feature.feature}</Typography>
                  </td>
                  <td className='flex items-center justify-center'>
                    {feature.starter ? (
                      <CustomAvatar skin='light' color='primary' size={20}>
                        <i className='tabler-check text-primary text-[14px]' />
                      </CustomAvatar>
                    ) : (
                      <CustomAvatar skin='light' color='secondary' size={20}>
                        <i className='tabler-x text-[14px]' />
                      </CustomAvatar>
                    )}
                  </td>
                  <td>
                    <div className='flex items-center justify-center'>
                      {feature.pro ? (
                        <CustomAvatar skin='light' color='primary' size={20}>
                          <i className='tabler-check text-primary text-[14px]' />
                        </CustomAvatar>
                      ) : feature.addOnAvailable.pro && !feature.pro ? (
                        <Chip variant='tonal' size='small' color='primary' label='Add-on-Available' />
                      ) : (
                        <CustomAvatar skin='light' color='secondary' size={20}>
                          <i className='tabler-x text-[14px]' />
                        </CustomAvatar>
                      )}
                    </div>
                  </td>
                  <td className='flex items-center justify-center'>
                    {feature.enterprise ? (
                      <CustomAvatar skin='light' color='primary' size={20}>
                        <i className='tabler-check text-primary text-[14px]' />
                      </CustomAvatar>
                    ) : (
                      <CustomAvatar skin='light' color='secondary' size={20}>
                        <i className='tabler-x text-[14px]' />
                      </CustomAvatar>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                {plans.map((plan, index) => (
                  <td key={index} className='text-center plb-[9px]'>
                    <Button component={Link} href='/front-pages/payment' variant={plan.variant}>
                      {plan.label}
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Plans
