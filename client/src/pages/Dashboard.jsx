import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { useAuth } from '../App.jsx';
import SleepForm from '../components/SleepForm.jsx';
import SleepList from '../components/SleepList.jsx';

export default function Dashboard() {
  const { logout } = useAuth();
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const { data } = await api.get('/sleep');
    setLogs(data);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleAdd = async (entry) => {
    await api.post('/sleep', entry);
    fetchLogs();
  };

  const handleDelete = async (id) => {
    await api.delete(`/sleep/${id}`);
    setLogs(logs.filter(l => l._id !== id));
  };

  const avgDuration = logs.length
    ? (logs.reduce((sum, l) => sum + (new Date(l.wakeTime) - new Date(l.sleepTime)) / 3600000, 0) / logs.length).toFixed(1)
    : 0;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Sleep Tracker</h2>
        <button onClick={logout}>Logout</button>
      </div>
      {logs.length > 0 && <p>Average sleep: <strong>{avgDuration} hrs</strong></p>}
      <SleepForm onAdd={handleAdd} />
      <SleepList logs={logs} onDelete={handleDelete} />
    </div>
  );
}
