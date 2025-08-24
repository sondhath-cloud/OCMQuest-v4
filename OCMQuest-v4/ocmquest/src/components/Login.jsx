import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (error) {
        console.error('Login error:', error)
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials or try resetting your password.')
        } else {
          setError(error.message)
        }
      } else {
        onLoginSuccess(data.user)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setMessage('')

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Password reset email sent! Please check your email and follow the instructions.')
      }
    } catch (err) {
      setError('Failed to send reset email')
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
      <h2>Login</h2>
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
      <form onSubmit={handleLogin}>
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
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleForgotPassword}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
            marginRight: '15px'
          }}
        >
          Forgot Password?
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'none',
            border: 'none',
            color: '#28a745',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Back to Register
        </button>
      </div>
    </div>
  )
}

export default Login
