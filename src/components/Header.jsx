import { signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '@/utils/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  console.log(user)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  return (
    <div className="absolute flex justify-between items-center w-screen px-8 py-2 bg-linear-to-b from-black z-10">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      {user && (
        <button
          type="button"
          onClick={handleSignOut}
          className="z-20 h-1/2 rounded-sm bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600 cursor-pointer"
        >
          Sign Out
        </button>
      )}
    </div>
  )
}

export default Header
