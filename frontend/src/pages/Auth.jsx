import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const { data } = await api.post(endpoint, { email, password })
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  )
}