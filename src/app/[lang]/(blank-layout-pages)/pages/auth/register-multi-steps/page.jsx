// Component Imports
import RegisterMultiSteps from '@views/pages/auth/register-multi-steps'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const RegisterMultiStepsPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <RegisterMultiSteps mode={mode} />
}

export default RegisterMultiStepsPage
