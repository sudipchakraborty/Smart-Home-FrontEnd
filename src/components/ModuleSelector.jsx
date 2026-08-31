export const ModuleSelector = ({ modules, selectedId, onChange, disabled }) => (
  <div className="module-section">
    <span className="field-label">Modules on this node</span>
    <div className="module-grid" role="list">
      {modules.map((module) => (
        <button className={`module-button ${selectedId === module.id ? 'module-selected' : ''}`} key={module.id} type="button" onClick={() => onChange(module.id)} disabled={disabled || !module.schedulable} role="listitem">
          <span className={`module-symbol module-${module.type}`} aria-hidden="true" />
          <strong>{module.name}</strong>
          <small>{module.schedulable ? 'Schedule' : 'Control API needed'}</small>
        </button>
      ))}
    </div>
  </div>
);
