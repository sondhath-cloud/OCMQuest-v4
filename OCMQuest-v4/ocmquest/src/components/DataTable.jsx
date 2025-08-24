import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function DataTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'active' })

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users_data')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setUsers(data || [])
      }
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  // Add new user
  const addUser = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('users_data')
        .insert([newUser])
        .select()

      if (error) {
        setError(error.message)
      } else {
        setUsers([data[0], ...users])
        setNewUser({ name: '', email: '', status: 'active' })
      }
    } catch (err) {
      setError('Failed to add user')
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    try {
      const { error } = await supabase
        .from('users_data')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
        console.error('Delete error:', error)
      } else {
        // Refresh the data from the database to ensure consistency
        await fetchUsers()
        console.log('User deleted successfully and data refreshed')
      }
    } catch (err) {
      setError('Failed to delete user')
      console.error('Delete exception:', err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Users Data Table</h2>
        <button
          onClick={fetchUsers}
          style={{
            padding: '8px 16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh Data
        </button>
      </div>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          Error: {error}
        </div>
      )}

      {/* Add new user form */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Add New User</h3>
        <form onSubmit={addUser} style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({...newUser, status: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          border: '1px solid #ddd',
          backgroundColor: 'white'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Created At</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: 
                      user.status === 'active' ? '#d4edda' :
                      user.status === 'inactive' ? '#f8d7da' : '#fff3cd',
                    color: 
                      user.status === 'active' ? '#155724' :
                      user.status === 'inactive' ? '#721c24' : '#856404'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          No users found. Add some users using the form above!
        </p>
      )}
    </div>
  )
}

export default DataTable
