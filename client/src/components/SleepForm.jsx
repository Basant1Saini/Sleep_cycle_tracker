import { useState } from 'react';

export default function SleepForm({ onAdd }) {
  const [form, setForm] = useState({ sleepTime: '', wakeTime: '', quality: 3, notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ sleepTime: '', wakeTime: '', quality: 3, notes: '' });
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h3>Log Sleep</h3>
      <label>Sleep Time <input type="datetime-local" required value={form.sleepTime} onChange={set('sleepTime')} /></label>
      <label>Wake Time  <input type="datetime-local" required value={form.wakeTime}  onChange={set('wakeTime')} /></label>
      <label>Quality (1–5) <input type="number" min={1} max={5} value={form.quality} onChange={set('quality')} /></label>
      <label>Notes <input placeholder="Optional notes" value={form.notes} onChange={set('notes')} /></label>
      <button type="submit">Add Log</button>
    </form>
  );
}
