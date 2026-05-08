import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useState } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(0)

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>AI Task Platform</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <TaskForm onTaskCreated={() => setRefresh(r => r + 1)} />
      <TaskList refresh={refresh} />
    </div>
  )
}