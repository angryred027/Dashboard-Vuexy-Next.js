// MUI Imports
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'

const MailContentSearch = props => {
  // Props
  const { isBelowScreen, searchTerm, setSidebarOpen, setBackdropOpen, setSearchTerm } = props

  // Open sidebar on below md screen
  const handleToggleSidebar = () => {
    setSidebarOpen(true)
    setBackdropOpen(true)
  }

  return (
    <div className='flex items-center gap-1 is-full pli-4 border-be'>
      {isBelowScreen && (
        <IconButton onClick={handleToggleSidebar}>
          <i className='tabler-menu-2 text-textSecondary' />
        </IconButton>
      )}
      <InputBase
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        startAdornment={<i className='tabler-search text-textSecondary mie-4' />}
        placeholder='Search mail'
        className='bs-[56px]'
      />
    </div>
  )
}

export default MailContentSearch
