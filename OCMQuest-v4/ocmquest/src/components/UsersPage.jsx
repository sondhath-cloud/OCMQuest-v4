import { useAuth } from '../contexts/AuthContext'
import DataTable from './DataTable'

function UsersPage() {
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
            Users Management
          </h1>
          <p style={{ margin: '0', color: '#666' }}>
            Manage user accounts and data in your system
          </p>
        </div>
        <button 
          onClick={signOut}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
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

      <DataTable />
    </div>
  )
}

export default UsersPage
