export default function SleepList({ logs, onDelete }) {
  if (!logs.length) return <p>No sleep logs yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {logs.map(log => {
        const duration = ((new Date(log.wakeTime) - new Date(log.sleepTime)) / 3600000).toFixed(1);
        return (
          <li key={log._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{new Date(log.sleepTime).toLocaleDateString()}</strong>{' '}
              {new Date(log.sleepTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} →{' '}
              {new Date(log.wakeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              | {duration} hrs | Quality: {log.quality}/5
              {log.notes && <span> | {log.notes}</span>}
            </div>
            <button onClick={() => onDelete(log._id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
