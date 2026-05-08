import { useEffect, useState } from 'react'
import api from '../api'
import TaskLogs from './TaskLogs'

const STATUS_COLOR = {
  pending: '#f59e0b',
  running: '#3b82f6',
  success: '#10b981',
  failed:  '#ef4444'
}

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([])
  const [selected, setSelected] = useState(null)

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks')
    setTasks(data)
    // update selected task if it exists
    if (selected) {
      const updated = data.find(t => t._id === selected._id)
      if (updated) setSelected(updated)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [refresh])

  useEffect(() => {
    const interval = setInterval(fetchTasks, 1000)
    return () => clearInterval(interval)
  }, [selected])

  return (
    <div>
      <h3>Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map(task => (
        <div
          key={task._id}
          onClick={() => setSelected(selected?._id === task._id ? null : task)}
          style={{ padding: 12, marginBottom: 8, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{task.title}</strong>
            <span style={{ color: STATUS_COLOR[task.status], fontWeight: 500 }}>
              {task.status}
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>{task.operation}</div>
          {selected?._id === task._id && <TaskLogs task={task} />}
        </div>
      ))}
    </div>
  )
}