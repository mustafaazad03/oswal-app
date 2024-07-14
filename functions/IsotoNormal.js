export function convertISODateToNormal(isoDate, format) {
  // Create a Date object from the ISO date string
  const date = new Date(isoDate);

  // Check if date object is valid (avoid errors with invalid ISO strings)
  if (isNaN(date.getTime())) {
    return 'Invalid ISO Date format';
  }

  // Define default format (YYYY-MM-DD HH:mm:ss)
  let result = '';

  // Handle different output formats based on the provided argument (optional)
  if (format) {
    result = date.toLocaleDateString(undefined, format);
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
    const hours = String(date.getHours()).padStart(2, '0'); // Add leading zero for single-digit hours
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero for single-digit minutes
    // const seconds = String(date.getSeconds()).padStart(2, '0'); // Add leading zero for single-digit seconds

    result = `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return result;
}
