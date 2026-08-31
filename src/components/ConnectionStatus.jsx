const STATUS_LABELS = { loading: 'Connecting', ready: 'Connected', editing: 'Changes pending', saving: 'Updating', success: 'Updated', error: 'Attention needed' };

export const ConnectionStatus = ({ status, message }) => (
  <div className={`status-banner status-${status}`} role="status" aria-live="polite">
    <span className="status-dot" aria-hidden="true" />
    <div><strong>{STATUS_LABELS[status]}</strong><span>{message}</span></div>
  </div>
);
