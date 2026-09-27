import { useCallback, useEffect, useState } from 'react';
import { deviceControlApi } from '../services/deviceControlApi';

export const useDeviceControl = () => {
  const [relayStatus, setRelayStatus] = useState({ relay1: null, relay2: null });
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Reading relay status from device…');
  const load = useCallback(async () => {
    setStatus('loading');
    try { setRelayStatus(await deviceControlApi.readRelayStatus()); setStatus('ready'); setMessage('Relay status synchronized with device'); }
    catch (error) { setStatus('error'); setMessage(error.message); }
  }, []);
  useEffect(() => { void Promise.resolve().then(load); }, [load]);
  const reset = async () => {
    setStatus('saving'); setMessage('Sending device reset command…');
    try { await deviceControlApi.reset(); setStatus('success'); setMessage('Reset command accepted by device'); }
    catch (error) { setStatus('error'); setMessage(error.message); }
  };
  return { relayStatus, status, message, load, reset };
};
