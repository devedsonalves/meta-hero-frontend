import AppLogo from '@/components/app-logo'
import { logout } from '@/features/login/services/auth-service'

function DashboardPage() {
  const handleLogout = async () => {
    await logout()
    window.location.href = '/entrar'
  }

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <AppLogo />
      <button
        className="mt-4 px-4 py-2 bg-red-400 text-white rounded cursor-pointer"
        onClick={() => {
          void handleLogout()
        }}
      >
        Logout <span className="ml-2">🚪</span>
      </button>
    </div>
  )
}

export default DashboardPage
