export const TimeField = ({ id, label, hint, value, onChange, disabled }) => (
  <label className="time-card" htmlFor={id}>
    <span className="time-icon" aria-hidden="true">{label === 'Turn on' ? 'ON' : 'OFF'}</span>
    <span className="time-copy"><strong>{label}</strong><small>{hint}</small></span>
    <input id={id} type="time" step="1" value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} required />
  </label>
);
