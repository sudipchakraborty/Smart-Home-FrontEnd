export const DeviceClockEditor = ({ clock }) => {
  const isBusy = clock.status === 'loading' || clock.status === 'saving';

  return (
    <form className="clock-editor" onSubmit={(event) => { event.preventDefault(); clock.update(); }}>
      <div className="schedule-heading">
        <div><span className="eyebrow">Device clock</span><h2>Set device date and time</h2></div>
        <button className="text-button" type="button" onClick={clock.read} disabled={isBusy}>Read device</button>
      </div>
      <label className="field-group" htmlFor="device-date-time">
        <span className="field-label">Local date and time</span>
        <input id="device-date-time" type="datetime-local" step="1" value={clock.dateTime} onChange={(event) => clock.change(event.target.value)} disabled={isBusy} required />
      </label>
      <div className={`clock-message status-${clock.status}`}>{clock.message}</div>
      <div className="clock-actions">
        <button className="secondary-button" type="button" onClick={clock.useBrowserTime} disabled={isBusy}>Use browser time</button>
        <button className="primary-button" type="submit" disabled={isBusy || !clock.dateTime}>{clock.status === 'saving' ? 'Updating device…' : 'Update device clock'}</button>
      </div>
    </form>
  );
};
