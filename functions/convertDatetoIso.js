export function convertDateToISO(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date. Please provide a valid Date object.');
  }
  return date.toISOString();
}
