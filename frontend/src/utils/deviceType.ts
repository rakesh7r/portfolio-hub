export const getDeviceType = () => {
  if (window.innerWidth < 768) {
    return 'Mobile';
  }
  if (window.innerWidth < 1024) {
    return 'Tablet';
  }
  return 'Desktop';
};
