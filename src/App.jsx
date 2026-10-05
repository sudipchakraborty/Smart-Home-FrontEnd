import { useCallback, useEffect, useMemo, useState } from 'react';

import './App.css';
import { ConnectionStatus } from './components/ConnectionStatus';
import { DeviceClockEditor } from './components/DeviceClockEditor';
import { ModuleSelector } from './components/ModuleSelector';
import { NodeSelector } from './components/NodeSelector';
import { ScheduleEditor } from './components/ScheduleEditor';
import { deviceModules } from './config/appConfig';
import { apiRequest } from './services/apiClient';
import { useRelaySchedule } from './hooks/useRelaySchedule';
import { useDeviceClock } from './hooks/useDeviceClock';
import { useOutputAccess } from './hooks/useOutputAccess';
import { OutputAccessEditor } from './components/OutputAccessEditor';
import { DeviceConfiguration } from './components/DeviceConfiguration';
import { DeviceControlPanel } from './components/DeviceControlPanel';
import { useDeviceControl } from './hooks/useDeviceControl';

function DeviceControls({ nodes, selectedNode, selectedModule, selectModule, selectNode, serialPort }) {
  const relaySchedule = useRelaySchedule(selectedModule.relayNumber, selectedNode.unitId);
  const deviceClock = useDeviceClock(selectedNode.unitId);
  const outputAccess = useOutputAccess(selectedNode.unitId);
  const deviceControl = useDeviceControl(selectedNode.unitId);
  const selectedNodeId = selectedNode.id;
  const isSaving = [relaySchedule, deviceClock, outputAccess, deviceControl].some((control) => control.status === 'saving');
  return <>
      <header className="topbar"><div className="brand-mark" aria-hidden="true">S</div><div><strong>Smart Home</strong><span>Node control center</span></div><div className="protocol-pill">Modbus ASCII - {serialPort}</div></header>
      <section className="hero-panel"><div><span className="eyebrow">Whole-home control</span><h1>Every room, one calm routine.</h1><p>Select a saved device to manage its relay schedules, date and time, and outputs.</p></div><div className="device-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="device-core">{selectedNode.name.charAt(0)}</div><span>SAVED DEVICE</span></div></section>
      <section className="workspace-grid">
        <aside className="device-panel">
          <span className="eyebrow">Saved devices</span><h2>Select device and module</h2>
          <NodeSelector nodes={nodes} selectedId={selectedNodeId} onChange={selectNode} disabled={isSaving} />
          <div className="device-summary"><span className="device-number">{selectedNode.name.charAt(0)}</span><div><strong>{selectedNode.name}</strong><p>{selectedNode.connection}</p></div></div>
          <ModuleSelector modules={selectedNode.modules} selectedId={selectedModule.id} onChange={selectModule} disabled={isSaving} />
          <ConnectionStatus status={relaySchedule.status} message={relaySchedule.message} />
        </aside>
        <ScheduleEditor schedule={relaySchedule.schedule} status={relaySchedule.status} isDirty={relaySchedule.isDirty} onChange={relaySchedule.updateField} onSave={relaySchedule.save} onRefresh={relaySchedule.load} />
      </section>
      <DeviceClockEditor clock={deviceClock} />
      <OutputAccessEditor access={outputAccess} />
      <DeviceControlPanel control={deviceControl} />
  </>;
}

function App() {
  const [devices, setDevices] = useState([]);
  const [serialPort, setSerialPort] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('relay-1');
  const [activeTab, setActiveTab] = useState('control');
  const [loading, setLoading] = useState(true);
  const [inventoryError, setInventoryError] = useState('');
  const loadSavedDevices = useCallback(async () => {
    setLoading(true);
    try {
      const saved = await apiRequest('/devices/saved');
      setDevices(saved.devices);
      setSerialPort(saved.serialPort);
      setSelectedNodeId((current) => saved.devices.some((device) => String(device.unitId) === current) ? current : String(saved.devices[0]?.unitId ?? ''));
      setInventoryError('');
      return saved.devices;
    } catch (error) { setInventoryError(error.message); throw error; }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void Promise.resolve().then(loadSavedDevices).catch(() => {}); }, [loadSavedDevices]);
  const nodes = useMemo(() => devices.map((device) => ({ ...device, id: String(device.unitId),
    name: device.deviceName || `Modbus device ${device.unitId}`, available: true, modules: deviceModules,
    connection: `Modbus ID ${device.unitId} - ${serialPort}` })), [devices, serialPort]);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const selectedModule = deviceModules.find((module) => module.id === selectedModuleId) ?? deviceModules[0];
  const selectNode = (nodeId) => { setSelectedNodeId(nodeId); setSelectedModuleId('relay-1'); };
  return <main className="app-shell">
    <nav className="app-tabs" aria-label="Application sections">
      <button type="button" className={activeTab === 'control' ? 'app-tab tab-active' : 'app-tab'} onClick={() => setActiveTab('control')}>Control</button>
      <button type="button" className={activeTab === 'configuration' ? 'app-tab tab-active' : 'app-tab'} onClick={() => setActiveTab('configuration')}>Configuration</button>
    </nav>
    {inventoryError && <div className="scan-message status-error" role="alert">Could not load saved devices: {inventoryError} <button className="text-button" type="button" onClick={() => { void loadSavedDevices().catch(() => {}); }}>Retry</button></div>}
    {activeTab === 'configuration' ? <DeviceConfiguration savedDevices={devices} onDevicesChanged={loadSavedDevices} /> :
      loading ? <section className="device-panel">Loading saved devices...</section> :
      selectedNode ? <DeviceControls key={selectedNode.unitId} nodes={nodes} selectedNode={selectedNode} selectedModule={selectedModule} selectNode={selectNode} selectModule={setSelectedModuleId} serialPort={serialPort} /> :
      <section className="device-panel"><span className="eyebrow">Saved devices</span><h2>No saved devices yet</h2><p>Scan the Modbus line in Configuration to save devices. They will be available here next time.</p><button className="primary-button" type="button" onClick={() => setActiveTab('configuration')}>Open Configuration</button></section>}
  </main>;
}

export default App;
