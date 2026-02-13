import { ToastContainer } from 'react-toastify'
import Router from './routes'
import { AppProvider } from './provider'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AppProvider>
      <div className="App h-screen">
        <Router />
      </div>
      <ToastContainer />
    </AppProvider>
  )
}

export default App
