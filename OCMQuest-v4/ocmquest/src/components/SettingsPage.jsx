import { useAuth } from '../contexts/AuthContext'

function SettingsPage() {
  const { user, signOut } = useAuth()

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Settings</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }}>
        {/* User Profile Section */}
        <div style={{
          padding: '25px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>User Profile</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email Address:
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#e9ecef',
                color: '#6c757d'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              User ID:
            </label>
            <input
              type="text"
              value={user?.id || ''}
              disabled
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#e9ecef',
                color: '#6c757d'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Last Sign In:
            </label>
            <input
              type="text"
              value={user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
              disabled
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#e9ecef',
                color: '#6c757d'
              }}
            />
          </div>
        </div>

        {/* Application Settings Section */}
        <div style={{
          padding: '25px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Application Settings</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ marginRight: '10px' }}
              />
              Enable email notifications
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ marginRight: '10px' }}
              />
              Show data analytics
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
              />
              Enable two-factor authentication
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ marginRight: '10px' }}
              />
              Auto-save changes
            </label>
          </div>
        </div>

        {/* System Information Section */}
        <div style={{
          padding: '25px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>System Information</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              App Version:
            </label>
            <span style={{ color: '#666' }}>OCMQuest v4.0.0</span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Database:
            </label>
            <span style={{ color: '#666' }}>Supabase</span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Framework:
            </label>
            <span style={{ color: '#666' }}>React + Vite</span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Last Updated:
            </label>
            <span style={{ color: '#666' }}>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={signOut}
          style={{
            padding: '12px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default SettingsPage
