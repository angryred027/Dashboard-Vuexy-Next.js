// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, minLength, pipe, nonEmpty } from 'valibot'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled CustomTextField component
const CustomTextFieldStyled = styled(CustomTextField)({
  '& .MuiInputBase-root.MuiFilledInput-root': {
    backgroundColor: 'var(--mui-palette-background-paper) !important'
  }
})

const schema = object({
  title: pipe(string(), nonEmpty('Title is required'), minLength(1))
})

const NewColumn = ({ addNewColumn }) => {
  // States
  const [display, setDisplay] = useState(false)

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ''
    },
    resolver: valibotResolver(schema)
  })

  // Display the Add New form
  const toggleDisplay = () => {
    setDisplay(!display)
  }

  // Handle the Add New form
  const onSubmit = data => {
    addNewColumn(data.title)
    setDisplay(false)
    reset({ title: '' })
  }

  // Handle reset
  const handleReset = () => {
    toggleDisplay()
    reset({ title: '' })
  }

  return (
    <div className='flex flex-col gap-4 items-start min-is-[16.5rem] is-[16.5rem]'>
      <Typography variant='h5' onClick={toggleDisplay} className='flex items-center gap-1 cursor-pointer'>
        <i className='tabler-plus text-base' />
        <span className='whitespace-nowrap'>Add New</span>
      </Typography>
      {display && (
        <form
          className='flex flex-col gap-4 is-[16.5rem]'
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              handleReset()
            }
          }}
        >
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <CustomTextFieldStyled
                fullWidth
                autoFocus
                variant='outlined'
                placeholder='Board Title'
                {...field}
                error={Boolean(errors.title)}
                helperText={errors.title ? errors.title.message : null}
              />
            )}
          />
          <div className='flex gap-3'>
            <Button variant='contained' size='small' color='primary' type='submit'>
              Add
            </Button>
            <Button
              variant='tonal'
              size='small'
              color='secondary'
              onClick={() => {
                handleReset()
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NewColumn
