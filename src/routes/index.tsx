import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Articles from '@/features/dashboard/pages'
import PrivateRoute from './private-route'
import PublicRoute from './public-route'
import LoginPage from '@/features/login/pages'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/entrar"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default Router
