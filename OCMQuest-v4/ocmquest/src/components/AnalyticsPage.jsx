import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    pendingUsers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      
      // Get total count
      const { count: total } = await supabase
        .from('users_data')
        .select('*', { count: 'exact', head: true })

      // Get counts by status
      const { data: statusCounts } = await supabase
        .from('users_data')
        .select('status')

      const activeCount = statusCounts?.filter(u => u.status === 'active').length || 0
      const inactiveCount = statusCounts?.filter(u => u.status === 'inactive').length || 0
      const pendingCount = statusCounts?.filter(u => u.status === 'pending').length || 0

      setStats({
        totalUsers: total || 0,
        activeUsers: activeCount,
        inactiveUsers: inactiveCount,
        pendingUsers: pendingCount
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading analytics...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Data Analytics</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          padding: '25px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #bbdefb',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2', fontSize: '24px' }}>
            {stats.totalUsers}
          </h3>
          <p style={{ margin: '0', color: '#424242', fontWeight: 'bold' }}>Total Users</p>
        </div>

        <div style={{
          padding: '25px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #a5d6a7',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#388e3c', fontSize: '24px' }}>
            {stats.activeUsers}
          </h3>
          <p style={{ margin: '0', color: '#424242', fontWeight: 'bold' }}>Active Users</p>
        </div>

        <div style={{
          padding: '25px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ffcc80',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00', fontSize: '24px' }}>
            {stats.pendingUsers}
          </h3>
          <p style={{ margin: '0', color: '#424242', fontWeight: 'bold' }}>Pending Users</p>
        </div>

        <div style={{
          padding: '25px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '1px solid #ef9a9a',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#d32f2f', fontSize: '24px' }}>
            {stats.inactiveUsers}
          </h3>
          <p style={{ margin: '0', color: '#424242', fontWeight: 'bold' }}>Inactive Users</p>
        </div>
      </div>

      <div style={{
        padding: '25px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>User Status Distribution</h3>
        
        {stats.totalUsers > 0 ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                width: '100%',
                height: '30px',
                backgroundColor: '#e9ecef',
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${(stats.activeUsers / stats.totalUsers) * 100}%`,
                  height: '100%',
                  backgroundColor: '#28a745',
                  transition: 'width 0.3s ease'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% Active
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No users found to display statistics.</p>
        )}
      </div>

      <button
        onClick={fetchStats}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Refresh Statistics
      </button>
    </div>
  )
}

export default AnalyticsPage
