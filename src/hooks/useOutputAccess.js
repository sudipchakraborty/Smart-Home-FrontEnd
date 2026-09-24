import { useCallback, useEffect, useState } from 'react';
import { outputAccessApi } from '../services/outputAccessApi';

export const OUTPUTS = [
  ['relay1', 'Relay 1'], ['relay2', 'Relay 2'], ['buzzer', 'Buzzer'],
  ['ledTx', 'TX LED'], ['ledRx', 'RX LED'], ['ledStatus', 'Status LED'],
];

export const useOutputAccess = () => {
  const [outputs, setOutputs] = useState({});
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Reading hardware outputs from device…');
  const load = useCallback(async () => {
    setStatus('loading');
    try { setOutputs(await outputAccessApi.read()); setStatus('ready'); setMessage('Hardware outputs synchronized with device'); }
    catch (error) { setStatus('error'); setMessage(error.message); }
  }, []);
  useEffect(() => { void Promise.resolve().then(load); }, [load]);
  const update = async (name, enabled) => {
    setStatus('saving'); setMessage(`Updating ${name}…`);
    try { setOutputs(await outputAccessApi.update(name, enabled)); setStatus('success'); setMessage('Hardware output updated and verified'); }
    catch (error) { setStatus('error'); setMessage(error.message); }
  };
  return { outputs, status, message, load, update };
};
