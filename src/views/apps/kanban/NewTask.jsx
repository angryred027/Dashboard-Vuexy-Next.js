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
  content: pipe(string(), nonEmpty('Content is required'), minLength(1))
})

const NewTask = ({ addTask }) => {
  // States
  const [displayNewItem, setDisplayNewItem] = useState(false)

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      content: ''
    },
    resolver: valibotResolver(schema)
  })

  // Display the Add New Task form
  const toggleDisplay = () => {
    setDisplayNewItem(!displayNewItem)
  }

  // Handle the Add New Task form
  const onSubmit = data => {
    addTask(data.content)
    setDisplayNewItem(false)
    reset({ content: '' })
  }

  // Handle reset
  const handleReset = () => {
    toggleDisplay()
    reset({ content: '' })
  }

  return (
    <div className='flex flex-col gap-4 items-start'>
      <Typography onClick={toggleDisplay} color='text.primary' className='flex items-center gap-1 cursor-pointer'>
        <i className='tabler-plus text-base' />
        <span>Add New Item</span>
      </Typography>
      {displayNewItem && (
        <form className='flex flex-col gap-4 min-is-[16.5rem]' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='content'
            control={control}
            render={({ field }) => (
              <CustomTextFieldStyled
                fullWidth
                multiline
                autoFocus
                rows={2}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(onSubmit)(e)
                  }

                  if (e.key === 'Escape') {
                    handleReset()
                  }
                }}
                placeholder='Add Content'
                variant='outlined'
                {...field}
                error={Boolean(errors.content)}
                helperText={errors.content ? errors.content.message : null}
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

export default NewTask
