export const NodeSelector = ({ nodes, selectedId, onChange, disabled }) => (
  <label className="field-group">
    <span className="field-label">Choose room node</span>
    <select value={selectedId} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
      {nodes.map((node) => <option key={node.id} value={node.id} disabled={!node.available}>{node.name}{node.available ? '' : ' · setup required'}</option>)}
    </select>
  </label>
);
