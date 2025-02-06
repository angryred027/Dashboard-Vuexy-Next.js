'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import Radio from '@mui/material/Radio'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// Component Imports
import CustomInputHorizontal from '@core/components/custom-inputs/Horizontal'
import CustomTextField from '@core/components/mui/TextField'

// Vars
const data = [
  {
    title: 'Standard 3-5 Days',
    meta: 'Free',
    content: 'Friday, 15 Nov - Monday, 18 Nov',
    isSelected: true,
    value: 'standard'
  },
  {
    title: 'Express',
    meta: '$5.00',
    content: 'Friday, 15 Nov - Sunday, 17 Nov',
    value: 'express'
  },
  {
    title: 'Overnight',
    meta: '$10.00',
    content: 'Friday, 15 Nov - Saturday, 16 Nov',
    value: 'overnight'
  }
]

const FormLayoutsCollapsible = () => {
  // Vars
  const initialSelectedOption = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // States
  const [expanded, setExpanded] = useState('panel1')
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)

  const [cardData, setCardData] = useState({
    fullName: '',
    phone: '',
    address: '',
    zipCode: '',
    landmark: '',
    city: '',
    country: '',
    addressType: 'home',
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  const handleExpandChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  const handleReset = () => {
    setCardData({
      fullName: '',
      phone: '',
      address: '',
      zipCode: '',
      landmark: '',
      city: '',
      country: '',
      addressType: '',
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    })
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')}>
        <AccordionSummary expandIcon={<i className='tabler-chevron-right' />}>
          <Typography>Delivery Address</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className='!pbs-6'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                value={cardData.fullName}
                onChange={e => setCardData({ ...cardData, fullName: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Phone No.'
                placeholder='123-456-7890'
                value={cardData.phone}
                onChange={e => setCardData({ ...cardData, phone: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                rows={4}
                multiline
                label='Address'
                placeholder='1456, Liberty Street'
                value={cardData.address}
                onChange={e => setCardData({ ...cardData, address: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                type='number'
                label='ZIP Code'
                placeholder='10005'
                value={cardData.zipCode}
                onChange={e => setCardData({ ...cardData, zipCode: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Landmark'
                placeholder='Nr Wall Street'
                value={cardData.landmark}
                onChange={e => setCardData({ ...cardData, landmark: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='City'
                placeholder='New York'
                value={cardData.city}
                onChange={e => setCardData({ ...cardData, city: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                value={cardData.country}
                onChange={e => setCardData({ ...cardData, country: e.target.value })}
              >
                <MenuItem value=''>Select Country</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel>Address Type</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={cardData.addressType}
                onChange={e => setCardData({ ...cardData, addressType: e.target.value })}
              >
                <FormControlLabel value='home' control={<Radio />} label='Home (All day delivery)' />
                <FormControlLabel value='office' control={<Radio />} label='Office (Delivery between 10 AM - 5 PM)' />
              </RadioGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
        <AccordionSummary expandIcon={<i className='tabler-chevron-right' />}>
          <Typography>Delivery Options</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className='!pbs-6'>
          <Grid container>
            {data.map((item, index) => (
              <CustomInputHorizontal
                type='radio'
                key={index}
                data={item}
                gridProps={{
                  size: { xs: 12 },
                  className:
                    '[&:first-of-type>*]:rounded-be-none [&:last-of-type>*]:rounded-bs-none [&:nth-of-type(2)>*]:rounded-none'
                }}
                selected={selectedOption}
                name='custom-radios-basic'
                handleChange={handleOptionChange}
              />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleExpandChange('panel3')}>
        <AccordionSummary expandIcon={<i className='tabler-chevron-right' />}>
          <Typography>Payment Method</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className='!pbs-6'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <RadioGroup
                    row
                    name='payment-method-radio'
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel value='credit' control={<Radio />} label='Credit/Debit/ATM Card' />
                    <FormControlLabel value='cash' control={<Radio />} label='Cash on Delivery' />
                  </RadioGroup>
                </Grid>
                {paymentMethod === 'credit' ? (
                  <Grid size={{ xs: 12 }}>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12 }}>
                        <CustomTextField
                          fullWidth
                          name='number'
                          autoComplete='off'
                          label='Card Number'
                          placeholder='0000 0000 0000 0000'
                          value={cardData.number}
                          onChange={e => setCardData({ ...cardData, number: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <CustomTextField
                          fullWidth
                          name='name'
                          label='Name'
                          autoComplete='off'
                          placeholder='John Doe'
                          value={cardData.name}
                          onChange={e => setCardData({ ...cardData, name: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <CustomTextField
                          fullWidth
                          name='expiry'
                          autoComplete='off'
                          label='Expiry Date'
                          placeholder='MM/YY'
                          value={cardData.expiry}
                          onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <CustomTextField
                          fullWidth
                          name='cvv'
                          label='CVV Code'
                          autoComplete='off'
                          placeholder='123'
                          value={cardData.cvv}
                          onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider />
        <AccordionDetails className='flex gap-4 pbs-6'>
          <Button type='submit' variant='contained'>
            Place Order
          </Button>
          <Button type='reset' variant='tonal' color='secondary' onClick={() => handleReset()}>
            Reset
          </Button>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default FormLayoutsCollapsible
