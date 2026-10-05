import { useCallback, useEffect, useRef, useState } from 'react';

import { relayScheduleApi } from '../services/relayScheduleApi';

const EMPTY_SCHEDULE = { onTime: '', offTime: '' };
const toFormSchedule = (data) => ({ onTime: data.onTime.time, offTime: data.offTime.time });

export const useRelaySchedule = (relayNumber, unitId) => {
  const loadGeneration = useRef(0);
  const [schedule, setSchedule] = useState(EMPTY_SCHEDULE);
  const [savedSchedule, setSavedSchedule] = useState(EMPTY_SCHEDULE);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Reading schedule from device…');

  const load = useCallback(async () => {
    const generation = ++loadGeneration.current;
    setSchedule(EMPTY_SCHEDULE);
    setSavedSchedule(EMPTY_SCHEDULE);
    setStatus('loading');
    setMessage('Reading schedule from device…');
    try {
      const nextSchedule = toFormSchedule(await relayScheduleApi.read(relayNumber, unitId));
      if (generation !== loadGeneration.current) return;
      setSchedule(nextSchedule);
      setSavedSchedule(nextSchedule);
      setStatus('ready');
      setMessage('Schedule synchronized with device');
    } catch (error) {
      if (generation !== loadGeneration.current) return;
      setStatus('error');
      setMessage(error.message);
    }
  }, [relayNumber, unitId]);

  const invalidateLoads = useCallback(() => { ++loadGeneration.current; }, []);
  useEffect(() => {
    void Promise.resolve().then(load);
    return invalidateLoads;
  }, [load, invalidateLoads]);

  const updateField = (field, value) => {
    setSchedule((current) => ({ ...current, [field]: value }));
    setStatus('editing');
    setMessage('Unsaved schedule changes');
  };

  const save = async () => {
    setStatus('saving');
    setMessage('Writing schedule to device…');
    try {
      const verifiedSchedule = toFormSchedule(await relayScheduleApi.update(relayNumber, schedule, unitId));
      setSchedule(verifiedSchedule);
      setSavedSchedule(verifiedSchedule);
      setStatus('success');
      setMessage('Schedule updated and verified on device');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return {
    schedule, status, message, load, save, updateField,
    isDirty: schedule.onTime !== savedSchedule.onTime || schedule.offTime !== savedSchedule.offTime,
  };
};
