import Body from '@/components/Body'
import Browse from '@/components/Browse'
import Login from '@/components/Login'
import appStore from '@/utils/appStore'
import LoginError from '@/components/LoginError'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      { index: true, element: <Login /> },
      { path: 'browse', element: <Browse /> },
      { path: 'error', element: <LoginError /> },
    ],
  },
])

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App
