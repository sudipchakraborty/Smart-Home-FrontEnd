export const NodeSelector = ({ nodes, selectedId, onChange, disabled }) => (
  <label className="field-group">
    <span className="field-label">Choose saved device</span>
    <select value={selectedId} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
      {nodes.map((node) => <option key={node.id} value={node.id}>{node.name} (ID {node.unitId})</option>)}
    </select>
  </label>
);
