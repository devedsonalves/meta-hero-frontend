import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Articles from '@/features/dashboard/pages'
import PrivateRoute from './private-route'
import PublicRoute from './public-route'
import LoginPage from '@/features/login/pages'
import RegisterPage from '@/features/register/pages'
import LandingPage from '@/features/landing/pages'
import TransacoesPage from '@/features/transacoes/pages'
import MetasMissoesPage from '@/features/metas-missoes/pages'
import ShopPage from '@/features/shop/pages/shop'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/entrar"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/registro"
        element={
          <PublicRoute>
            <RegisterPage />
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
      <Route
        path="/transacoes"
        element={
          <PrivateRoute>
            <TransacoesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/metas-missoes"
        element={
          <PrivateRoute>
            <MetasMissoesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/loja"
        element={
          <PrivateRoute>
            <ShopPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default Router
