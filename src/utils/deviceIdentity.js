export const validateDeviceIdentity = ({ deviceId, deviceName }) => {
  const errors = {};
  if (!/^[0-9]{1,3}$/.test(deviceId ?? '')) {
    errors.deviceId = 'Enter a Device ID using 1-3 digits only.';
  } else if (Number(deviceId) < 1 || Number(deviceId) > 247) {
    errors.deviceId = 'Device ID must be between 1 and 247.';
  }
  if (typeof deviceName !== 'string' || !deviceName.trim()) {
    errors.deviceName = 'Enter a device name.';
  } else if (deviceName.length > 18) {
    errors.deviceName = 'Device name must be 18 characters or fewer.';
  }
  return errors;
};
