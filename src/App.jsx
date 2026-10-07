
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="min-h-screen font-body">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<CollectionPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        theme="light"
        toastStyle={{
          background: '#0f3d3e',
          color: '#f4f1de',
          fontFamily: 'Outfit, sans-serif',
          borderRadius: '12px',
        }}
      />
    </div>
  )
}

export default App