// React Imports
import { useState, useRef } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const AddCategoryDrawer = props => {
  // Props
  const { open, handleClose, categoryData, setData } = props

  // States
  const [fileName, setFileName] = useState('')
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')

  // Refs
  const fileInputRef = useRef(null)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  // Handle Form Submit
  const handleFormSubmit = data => {
    const newData = {
      id: categoryData.length + 1,
      categoryTitle: data.title,
      description: data.description,
      totalProduct: Math.floor(Math.random() * 9000) + 1000,
      totalEarning: Math.floor(Math.random() * 90000) + 10000,
      image: `/images/apps/ecommerce/product-${Math.floor(Math.random() * 20) + 1}.png`
    }

    setData([...categoryData, newData])
    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm({ title: '', description: '' })
    setFileName('')
    setCategory('')
    setComment('')
    setStatus('')
  }

  // Handle File Upload
  const handleFileUpload = event => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add Category</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Title'
                placeholder='Fashion'
                {...(errors.title && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Description'
                placeholder='Enter a description...'
                {...(errors.description && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div className='flex items-end gap-4'>
            <CustomTextField
              label='Attachment'
              placeholder='No file chosen'
              value={fileName}
              className='flex-auto'
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: fileName ? (
                    <InputAdornment position='end'>
                      <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                        <i className='tabler-x' />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              }}
            />
            <Button component='label' variant='tonal' htmlFor='contained-button-file' className='min-is-fit'>
              Choose
              <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
            </Button>
          </div>
          <CustomTextField
            select
            fullWidth
            label='Parent Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value='HouseHold'>HouseHold</MenuItem>
            <MenuItem value='Management'>Management</MenuItem>
            <MenuItem value='Electronics'>Electronics</MenuItem>
            <MenuItem value='Office'>Office</MenuItem>
            <MenuItem value='Accessories'>Accessories</MenuItem>
          </CustomTextField>
          <CustomTextField
            fullWidth
            label='Comment'
            value={comment}
            onChange={e => setComment(e.target.value)}
            multiline
            rows={4}
            placeholder='Write a Comment...'
          />
          <CustomTextField
            select
            fullWidth
            label='Category Status'
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value='Published'>Published</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
            <MenuItem value='Scheduled'>Scheduled</MenuItem>
          </CustomTextField>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Discard
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCategoryDrawer
