import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UsersPage from './components/UsersPage'
import AnalyticsPage from './components/AnalyticsPage'
import SettingsPage from './components/SettingsPage'
import Navigation from './components/Navigation'
import { useAuth } from './contexts/AuthContext'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { user, signOut } = useAuth()

  const handleLoginSuccess = (user) => {
    setShowLogin(false)
    setShowRegister(false)
  }

  const handleRegisterSuccess = (user) => {
    setShowLogin(false)
    setShowRegister(false)
  }

  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  if (showRegister) {
    return <Register onRegisterSuccess={handleRegisterSuccess} />
  }

  if (user) {
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />
        case 'users':
          return <UsersPage />
        case 'analytics':
          return <AnalyticsPage />
        case 'settings':
          return <SettingsPage />
        default:
          return <Dashboard />
      }
    }

    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderPage()}
      </>
    )
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 20px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to OCMQuest</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        A multi-user web application with authentication and data management
      </p>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          onClick={() => setShowLogin(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => setShowRegister(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default App
