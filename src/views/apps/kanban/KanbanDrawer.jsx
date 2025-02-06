// React Imports
import { useEffect, useState, useRef } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { minLength, nonEmpty, object, pipe, string } from 'valibot'

// Slice Imports
import { editTask, deleteTask } from '@/redux-store/slices/kanban'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Data Imports
import { chipColor } from './TaskCard'

const schema = object({
  title: pipe(string(), nonEmpty('Title is required'), minLength(1))
})

const KanbanDrawer = props => {
  // Props
  const { drawerOpen, dispatch, setDrawerOpen, task, columns, setColumns } = props

  // States
  const [date, setDate] = useState(task.dueDate)
  const [badgeText, setBadgeText] = useState(task.badgeText || [])
  const [fileName, setFileName] = useState('')
  const [comment, setComment] = useState('')

  // Refs
  const fileInputRef = useRef(null)

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: task.title
    },
    resolver: valibotResolver(schema)
  })

  // Handle File Upload
  const handleFileUpload = event => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)
    }
  }

  // Close Drawer
  const handleClose = () => {
    setDrawerOpen(false)
    reset({ title: task.title })
    setBadgeText(task.badgeText || [])
    setDate(task.dueDate)
    setFileName('')
    setComment('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Update Task
  const updateTask = data => {
    dispatch(editTask({ id: task.id, title: data.title, badgeText, dueDate: date }))
    handleClose()
  }

  // Handle Reset
  const handleReset = () => {
    setDrawerOpen(false)
    dispatch(deleteTask(task.id))

    const updatedColumns = columns.map(column => {
      return {
        ...column,
        taskIds: column.taskIds.filter(taskId => taskId !== task.id)
      }
    })

    setColumns(updatedColumns)
  }

  // To set the initial values according to the task
  useEffect(() => {
    reset({ title: task.title })
    setBadgeText(task.badgeText || [])
    setDate(task.dueDate)
  }, [task, reset])

  return (
    <div>
      <Drawer
        open={drawerOpen}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        onClose={handleClose}
      >
        <div className='flex justify-between items-center pli-6 plb-5 border-be'>
          <Typography variant='h5'>Edit Task</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <div className='p-6'>
          <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(updateTask)}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  label='Title'
                  {...field}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />

            <AppReactDatepicker
              selected={date ? new Date(date) : new Date()}
              id='basic-input'
              onChange={date => {
                date !== null && setDate(date)
              }}
              placeholderText='Click to select a date'
              dateFormat={'d MMMM, yyyy'}
              customInput={<CustomTextField label='Due Date' fullWidth />}
            />
            <CustomTextField
              select
              label='Label'
              slotProps={{
                select: {
                  multiple: true,
                  value: badgeText || [],
                  onChange: e => setBadgeText(e.target.value),
                  renderValue: selected => (
                    <div className='flex flex-wrap gap-1'>
                      {selected.map(value => (
                        <Chip
                          variant='tonal'
                          key={value}
                          size='small'
                          onMouseDown={e => e.stopPropagation()}
                          label={value}
                          color={chipColor[value]?.color}
                          onDelete={() => setBadgeText(current => current.filter(item => item !== value))}
                        />
                      ))}
                    </div>
                  )
                }
              }}
            >
              {Object.keys(chipColor).map(chip => (
                <MenuItem key={chip} value={chip}>
                  <Checkbox checked={badgeText && badgeText.indexOf(chip) > -1} />
                  <ListItemText primary={chip} />
                </MenuItem>
              ))}
            </CustomTextField>
            <div>
              <Typography variant='caption' color='text.primary'>
                Assigned
              </Typography>
              <div className='flex gap-1'>
                {task.assigned?.map((avatar, index) => (
                  <Tooltip title={avatar.name} key={index}>
                    <CustomAvatar key={index} src={avatar.src} size={26} className='cursor-pointer' />
                  </Tooltip>
                ))}
                <CustomAvatar size={26} className='cursor-pointer'>
                  <i className='tabler-plus text-base text-textSecondary' />
                </CustomAvatar>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomTextField
                fullWidth
                placeholder='Choose File'
                variant='outlined'
                value={fileName}
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
              <Button component='label' variant='tonal' htmlFor='contained-button-file'>
                Choose
                <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
              </Button>
            </div>
            <CustomTextField
              fullWidth
              label='Comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
              multiline
              rows={4}
              placeholder='Write a Comment....'
            />
            <div className='flex gap-4'>
              <Button variant='contained' color='primary' type='submit'>
                Update
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
                Delete
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default KanbanDrawer
