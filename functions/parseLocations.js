export const parseLocation = (location) => {
  if (!location) return 'Earth';
  if (typeof location == 'string' && location) return location;
  if (typeof location == 'object' && location.name) return location.name;
  let locationStr = '';
  if (typeof location == 'object' && location.city)
    locationStr += location.city;
  if (typeof location == 'object' && location.country)
    locationStr += `, ${location.country}`;

  return locationStr ? locationStr : 'Earth';
};
