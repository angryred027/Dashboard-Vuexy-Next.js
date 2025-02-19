// Third-party Imports
import { getServerSession } from 'next-auth'


// Component Imports
import SubRedirect from '@/components/SubRedirect'

export default async function AuthGuard({ children, locale }) {
  const session = await getServerSession()

  const user = session?.user;
  const sub = user?.subscription;

  return <>{(sub.status === 'active') ? children : <SubRedirect lang={locale} />}</>
}
