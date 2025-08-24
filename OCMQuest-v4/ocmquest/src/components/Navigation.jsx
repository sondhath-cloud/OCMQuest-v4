import { useAuth } from '../contexts/AuthContext'

function Navigation({ currentPage, onPageChange }) {
  const { user, signOut } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 20px',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <h2 style={{ margin: 0, color: '#ecf0f1' }}>OCMQuest</h2>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPage === item.id ? '#3498db' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
              >
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '14px', color: '#bdc3c7' }}>
            {user?.email}
          </span>
          <button
            onClick={signOut}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
