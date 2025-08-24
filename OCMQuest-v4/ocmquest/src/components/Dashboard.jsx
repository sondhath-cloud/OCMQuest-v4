import { useAuth } from '../contexts/AuthContext'
import DataTable from './DataTable'

function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
            Welcome to OCMQuest
          </h1>
          <p style={{ margin: '0', color: '#666' }}>
            Logged in as: {user?.email}
          </p>
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Welcome back!
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '8px', 
          border: '1px solid #bbdefb' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Users Management</h3>
          <p style={{ margin: '0', color: '#424242' }}>
            View, add, and manage user data in your system.
          </p>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f3e5f5', 
          borderRadius: '8px', 
          border: '1px solid #ce93d8' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>Data Analytics</h3>
          <p style={{ margin: '0', color: '#424242' }}>
            Analyze user statistics and system performance.
          </p>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '8px', 
          border: '1px solid #a5d6a7' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>Settings</h3>
          <p style={{ margin: '0', color: '#424242' }}>
            Configure your application preferences and security.
          </p>
        </div>
      </div>

      <DataTable />
    </div>
  )
}

export default Dashboard
