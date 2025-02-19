// Component Imports
import NotPermitted from './NotPermitted'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Error401 = async () => {
  // Vars
  const mode = await getServerMode()

  return <NotPermitted mode={mode} />
}

export default Error401
