'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const ProductOrganize = () => {
  // States
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [status, setStatus] = useState('')

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField select fullWidth label='Vendor' value={vendor} onChange={e => setVendor(e.target.value)}>
            <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
            <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
            <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
          </CustomTextField>
          <div className='flex items-end gap-4'>
            <CustomTextField
              select
              fullWidth
              label='Category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value='Household'>Household</MenuItem>
              <MenuItem value='Office'>Office</MenuItem>
              <MenuItem value='Electronics'>Electronics</MenuItem>
              <MenuItem value='Management'>Management</MenuItem>
              <MenuItem value='Automotive'>Automotive</MenuItem>
            </CustomTextField>
            <CustomIconButton variant='tonal' color='primary' className='min-is-fit'>
              <i className='tabler-plus' />
            </CustomIconButton>
          </div>
          <CustomTextField
            select
            fullWidth
            label='Collection'
            value={collection}
            onChange={e => setCollection(e.target.value)}
          >
            <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
            <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
            <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
          </CustomTextField>
          <CustomTextField select fullWidth label='Status' value={status} onChange={e => setStatus(e.target.value)}>
            <MenuItem value='Published'>Published</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
            <MenuItem value='Scheduled'>Scheduled</MenuItem>
          </CustomTextField>
          <CustomTextField fullWidth label='Enter Tags' placeholder='Fashion, Trending, Summer' />
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductOrganize
