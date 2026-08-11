import Header from '@/components/Header'
import { useState } from 'react'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-75"
          src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
          alt="Netflix background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <section className="relative flex min-h-screen items-center justify-center">
        <form className="flex flex-col justify-center w-3/12  bg-black text-white p-10 rounded-xs">
          <div className="mb-8">
            <h1 className="font-bold text-2xl">
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </h1>
          </div>
          <div className="flex flex-col gap-8 w-full mb-2">
            {!isSignInForm && (
              <input
                type="text"
                placeholder="Email Address"
                className="p-2 bg-white/5 border border-white/15 rounded-xs"
              />
            )}
            <input
              type="text"
              placeholder="Email Address"
              className="p-2 bg-white/5 border border-white/15 rounded-xs"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 bg-white/5 border border-white/15 rounded-xs"
            />
            <button className="bg-red-800 p-2 rounded-xs font-semibold cursor-pointer uppercase hover:bg-red-700">
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
          <p
            className=" text-sm text-white/60 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? ' Still not a user? Create new account'
              : 'Already Registered? Sign In'}
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login
