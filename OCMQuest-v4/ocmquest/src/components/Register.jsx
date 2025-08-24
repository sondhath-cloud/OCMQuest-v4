import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Register({ onRegisterSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage('')

    try {
      // First, create the user account
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name
          }
        }
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Registration successful! Please check your email and click the confirmation link. After confirming, you can log in with your credentials.')
        onRegisterSuccess(data.user)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px' 
    }}>
      <h2>Register</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </div>
      )}
      {message && (
        <div style={{ color: 'green', marginBottom: '15px' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
