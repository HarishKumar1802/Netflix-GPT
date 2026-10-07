import Header from '@/components/Header'
import { checkValidData } from '@/utils/validation'
import { auth } from '@/utils/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleBtnClick = async () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      isSignInForm ? undefined : name.current.value
    )
    setErrorMessage(message)
    if (message) return

    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      } else {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
        await updateProfile(user, { displayName: name.current.value })
      }
      navigate('/browse')
    } catch (error) {
      setErrorMessage(`${error.code}: ${error.message}`)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Header />
      <div className="absolute inset-0" aria-hidden="true">
        <img
          className="h-full w-full object-cover opacity-60"
          src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black" />
      </div>

      <main className="relative flex min-h-screen items-center justify-center px-4 pb-10 pt-20 sm:px-6">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleBtnClick()
          }}
          className="w-full max-w-md rounded-sm bg-black/85 px-6 py-8 shadow-2xl shadow-black/30 sm:px-12 sm:py-12"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {isSignInForm
                ? 'Welcome back. Enter your details to continue.'
                : 'Create an account to get started.'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-5">
            {!isSignInForm && (
              <div className="flex flex-col gap-2">
                <label htmlFor="full-name" className="text-sm font-medium text-white/80">
                  Full name
                </label>
                <input
                  ref={name}
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  className="rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus-visible:outline-none"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                Email address
              </label>
              <input
                ref={email}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-white/80">
                Password
              </label>
              <input
                ref={password}
                id="password"
                type="password"
                autoComplete={isSignInForm ? 'current-password' : 'new-password'}
                placeholder="Enter your password"
                className="rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus-visible:outline-none"
              />
            </div>
            {errorMessage && (
              <p role="alert" className="text-sm font-medium text-red-400">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              className="mt-1 rounded-sm bg-red-700 px-4 py-3 font-semibold transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <p className="mt-4 text-sm text-white/60">
            {isSignInForm ? 'New to Netflix?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleSignInForm}
              className="font-semibold text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isSignInForm ? 'Sign up now' : 'Sign in'}
            </button>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Login
