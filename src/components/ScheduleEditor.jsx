import { TimeField } from './TimeField';

export const ScheduleEditor = ({ schedule, status, isDirty, onChange, onSave, onRefresh }) => {
  const isBusy = status === 'loading' || status === 'saving';
  return (
    <form className="schedule-editor" onSubmit={(event) => { event.preventDefault(); onSave(); }}>
      <div className="schedule-heading">
          <div><span className="eyebrow">Selected relay module</span><h2>Set ON and OFF times</h2></div>
        <button className="text-button" type="button" onClick={onRefresh} disabled={isBusy}>Refresh</button>
      </div>
      <div className="time-grid">
        <TimeField id="on-time" label="Turn on" hint="Device starts at this time" value={schedule.onTime} onChange={(value) => onChange('onTime', value)} disabled={isBusy} />
        <TimeField id="off-time" label="Turn off" hint="Device stops at this time" value={schedule.offTime} onChange={(value) => onChange('offTime', value)} disabled={isBusy} />
      </div>
      <button className="primary-button" type="submit" disabled={isBusy || !isDirty || !schedule.onTime || !schedule.offTime}>
        {status === 'saving' ? 'Updating device…' : 'Update device schedule'}
      </button>
    </form>
  );
};
