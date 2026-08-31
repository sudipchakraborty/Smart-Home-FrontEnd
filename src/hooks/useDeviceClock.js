import { useCallback, useState } from 'react';

import { deviceClockApi } from '../services/deviceClockApi';

const localDateTime = () => {
  const now = new Date();
  const offsetNow = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return offsetNow.toISOString().slice(0, 19);
};

export const useDeviceClock = () => {
  const [dateTime, setDateTime] = useState(localDateTime);
  const [status, setStatus] = useState('ready');
  const [message, setMessage] = useState('Choose a date and time or use this browser time');

  const read = useCallback(async () => {
    setStatus('loading');
    setMessage('Reading date and time from device…');
    try {
      const data = await deviceClockApi.read();
      setDateTime(data.dateTime);
      setStatus('success');
      setMessage('Device date and time loaded');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }, []);

  const useBrowserTime = () => {
    setDateTime(localDateTime());
    setStatus('editing');
    setMessage('Browser date and time selected; update to send it to the device');
  };

  const update = async () => {
    setStatus('saving');
    setMessage('Writing date and time to device…');
    try {
      const data = await deviceClockApi.update(dateTime);
      setDateTime(data.dateTime);
      setStatus('success');
      setMessage('Device date and time updated and verified');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  const change = (value) => {
    setDateTime(value);
    setStatus('editing');
    setMessage('Date and time are ready to send');
  };

  return { dateTime, status, message, read, update, change, useBrowserTime };
};
