import { useState } from 'react'
import { supabase } from '../lib/supabase'

function DeleteTest() {
  const [testResult, setTestResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testDelete = async () => {
    setLoading(true)
    setTestResult('Testing delete operation...')

    try {
      // First, check current user session
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setTestResult(`Current user: ${currentUser?.email || 'Not authenticated'}. Testing delete operation...`)

      // First, let's see what users exist
      const { data: users, error: fetchError } = await supabase
        .from('users_data')
        .select('*')
        .limit(5)

      if (fetchError) {
        setTestResult(`Fetch error: ${fetchError.message}`)
        return
      }

      setTestResult(`Found ${users.length} users. Testing delete on first user...`)

      if (users.length === 0) {
        setTestResult('No users to test delete on')
        return
      }

      const testUser = users[0]
      
      // Try to delete the first user
      const { error: deleteError } = await supabase
        .from('users_data')
        .delete()
        .eq('id', testUser.id)

      if (deleteError) {
        setTestResult(`Delete failed: ${deleteError.message}`)
      } else {
        setTestResult(`Delete reported successful for user ${testUser.name} (ID: ${testUser.id}). Now checking if user still exists...`)
        
        // Wait a moment, then check if the user still exists
        setTimeout(async () => {
          const { data: checkUser, error: checkError } = await supabase
            .from('users_data')
            .select('*')
            .eq('id', testUser.id)
            .single()
          
          if (checkError && checkError.code === 'PGRST116') {
            setTestResult(`✅ User ${testUser.name} (ID: ${testUser.id}) was successfully deleted from database`)
          } else if (checkUser) {
            setTestResult(`❌ Delete reported success but user ${testUser.name} (ID: ${testUser.id}) still exists in database. This indicates an RLS policy issue.`)
          } else {
            setTestResult(`❌ Unexpected result checking user existence`)
          }
        }, 1000)
      }

    } catch (err) {
      setTestResult(`Exception: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '20px', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>Delete Operation Test</h3>
      <button
        onClick={testDelete}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'Testing...' : 'Test Delete Operation'}
      </button>
      <div style={{ 
        padding: '10px', 
        backgroundColor: 'white', 
        border: '1px solid #ddd',
        borderRadius: '4px',
        minHeight: '60px'
      }}>
        <strong>Test Result:</strong><br />
        {testResult || 'Click the button to test delete operations'}
      </div>
    </div>
  )
}

export default DeleteTest
