import { OUTPUTS } from '../hooks/useOutputAccess';

export const OutputAccessEditor = ({ access }) => {
  const isBusy = access.status === 'loading' || access.status === 'saving';
  return <section className="output-editor">
    <div className="schedule-heading"><div><span className="eyebrow">Hardware I/O</span><h2>Output access</h2></div><button className="text-button" type="button" onClick={access.load} disabled={isBusy}>Refresh</button></div>
    <div className="output-grid">{OUTPUTS.map(([name, label]) => <button className={`output-toggle ${access.outputs[name] ? 'output-on' : ''}`} type="button" key={name} onClick={() => access.update(name, !access.outputs[name])} disabled={isBusy} aria-pressed={Boolean(access.outputs[name])}><span className="output-indicator" /><span>{label}</span><strong>{access.outputs[name] ? 'ON' : 'OFF'}</strong></button>)}</div>
    <div className={`clock-message status-${access.status}`}>{access.message}</div>
  </section>;
};
