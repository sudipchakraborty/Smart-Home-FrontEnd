import { useMemo, useState } from 'react';

import './App.css';
import { ConnectionStatus } from './components/ConnectionStatus';
import { DeviceClockEditor } from './components/DeviceClockEditor';
import { ModuleSelector } from './components/ModuleSelector';
import { NodeSelector } from './components/NodeSelector';
import { ScheduleEditor } from './components/ScheduleEditor';
import { appConfig } from './config/appConfig';
import { useRelaySchedule } from './hooks/useRelaySchedule';
import { useDeviceClock } from './hooks/useDeviceClock';
import { useOutputAccess } from './hooks/useOutputAccess';
import { OutputAccessEditor } from './components/OutputAccessEditor';
import { DeviceConfiguration } from './components/DeviceConfiguration';

function App() {
  const [selectedNodeId, setSelectedNodeId] = useState('kitchen');
  const [selectedModuleId, setSelectedModuleId] = useState('relay-1');
  const selectedNode = useMemo(() => appConfig.nodes.find((node) => node.id === selectedNodeId), [selectedNodeId]);
  const selectedModule = selectedNode.modules.find((module) => module.id === selectedModuleId) ?? selectedNode.modules[0];
  const relaySchedule = useRelaySchedule(selectedModule.relayNumber);
  const deviceClock = useDeviceClock();
  const outputAccess = useOutputAccess();
  const [activeTab, setActiveTab] = useState('control');

  const selectNode = (nodeId) => { setSelectedNodeId(nodeId); setSelectedModuleId('relay-1'); };

  return (
    <main className="app-shell">
      <nav className="app-tabs" aria-label="Application sections"><button type="button" className={activeTab === 'control' ? 'app-tab tab-active' : 'app-tab'} onClick={() => setActiveTab('control')}>Control</button><button type="button" className={activeTab === 'configuration' ? 'app-tab tab-active' : 'app-tab'} onClick={() => setActiveTab('configuration')}>Configuration</button></nav>
      {activeTab === 'configuration' ? <DeviceConfiguration /> : <>
      <header className="topbar"><div className="brand-mark" aria-hidden="true">S</div><div><strong>Smart Home</strong><span>Node control center</span></div><div className="protocol-pill">Modbus ASCII · COM9</div></header>
      <section className="hero-panel"><div><span className="eyebrow">Whole-home control</span><h1>Every room, one calm routine.</h1><p>Select a room node, choose one of its connected modules, and manage that module without mixing device and relay identities.</p></div><div className="device-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="device-core">{selectedNode.name.charAt(0)}</div><span>ROOM NODE</span></div></section>
      <section className="workspace-grid">
        <aside className="device-panel">
          <span className="eyebrow">Physical nodes</span><h2>Select room and module</h2>
          <NodeSelector nodes={appConfig.nodes} selectedId={selectedNodeId} onChange={selectNode} disabled={relaySchedule.status === 'saving'} />
          <div className="device-summary"><span className="device-number">{selectedNode.location.charAt(0)}</span><div><strong>{selectedNode.name}</strong><p>{selectedNode.connection}</p></div></div>
          <ModuleSelector modules={selectedNode.modules} selectedId={selectedModule.id} onChange={setSelectedModuleId} disabled={relaySchedule.status === 'saving'} />
          <ConnectionStatus status={relaySchedule.status} message={relaySchedule.message} />
        </aside>
        <ScheduleEditor schedule={relaySchedule.schedule} status={relaySchedule.status} isDirty={relaySchedule.isDirty} onChange={relaySchedule.updateField} onSave={relaySchedule.save} onRefresh={relaySchedule.load} />
      </section>
      <DeviceClockEditor clock={deviceClock} />
      <OutputAccessEditor access={outputAccess} />
      </>}
    </main>
  );
}

export default App;
