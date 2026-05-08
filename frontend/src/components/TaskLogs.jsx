export default function TaskLogs({ task }) {
  return (
    <div style={{ marginTop: 12, padding: 12, background: '#f9f9f9', borderRadius: 6 }}>
      {task.result && (
        <div style={{ marginBottom: 8 }}>
          <strong>Result:</strong> {task.result}
        </div>
      )}
      <strong>Logs:</strong>
      <ul style={{ margin: '4px 0 0 16px', fontSize: 13 }}>
        {task.logs?.length > 0
          ? task.logs.map((log, i) => <li key={i}>{log}</li>)
          : <li>No logs yet</li>
        }
      </ul>
    </div>
  )
}