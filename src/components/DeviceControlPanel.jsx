export const DeviceControlPanel = ({ control }) => {
  const isBusy = control.status === 'loading' || control.status === 'saving';
  const relay = (key) => control.relayStatus[key] === null ? '—' : control.relayStatus[key] ? 'ON' : 'OFF';
  const reset = () => {
    if (window.confirm('Reset this device? The Edge will restart after accepting the RESET command.')) void control.reset();
  };
  return <section className="device-control-panel">
    <div className="schedule-heading"><div><span className="eyebrow">Device health</span><h2>Relay status & reset</h2></div><button className="text-button" type="button" onClick={control.load} disabled={isBusy}>Refresh</button></div>
    <div className="relay-status-grid">
      {[["relay1", "Relay 1"], ["relay2", "Relay 2"]].map(([key, label]) => <div className={`relay-status-card ${control.relayStatus[key] ? 'relay-status-on' : ''}`} key={key}><span className="output-indicator" /><span>{label}</span><strong>{relay(key)}</strong></div>)}
    </div>
    <button className="reset-button" type="button" onClick={reset} disabled={isBusy}>Reset device</button>
    <div className={`clock-message status-${control.status}`}>{control.message}</div>
  </section>;
};
