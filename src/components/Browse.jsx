import { signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import Header from './Header'

const Browse = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={handleSignOut}
        className="absolute right-8 top-4 z-20 rounded-sm bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Browse
