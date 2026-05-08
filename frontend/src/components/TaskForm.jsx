import { useState } from 'react'
import api from '../api'

const OPERATIONS = ['uppercase', 'lowercase', 'reverse', 'wordcount']

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('')
  const [inputText, setInputText] = useState('')
  const [operation, setOperation] = useState('uppercase')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: task } = await api.post('/tasks', { title, inputText, operation })
      await api.post(`/tasks/${task._id}/run`)
      setTitle('')
      setInputText('')
      onTaskCreated()
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Create Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <textarea
        placeholder="Input text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        required
        rows={3}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <select
        value={operation}
        onChange={e => setOperation(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8 }}
      >
        {OPERATIONS.map(op => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
      <button type="submit" disabled={loading} style={{ padding: '8px 24px' }}>
        {loading ? 'Running...' : 'Create & Run'}
      </button>
    </form>
  )
}