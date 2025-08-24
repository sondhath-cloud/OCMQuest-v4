import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by trying to fetch data from the users_data table
        const { data, error } = await supabase
          .from('users_data')
          .select('*')
          .limit(1)
        
        if (error) {
          setConnectionStatus('Connection failed')
          setError(error.message)
        } else {
          setConnectionStatus('Connection successful!')
          setError(null)
        }
      } catch (err) {
        setConnectionStatus('Connection failed')
        setError(err.message)
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Supabase Connection Test</h3>
      <p><strong>Status:</strong> {connectionStatus}</p>
      {error && (
        <p style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  )
}

export default SupabaseTest
