export const openGoogleMaps = () => {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=';
  const newWindow = window.open(mapsUrl, '_blank', 'width=800,height=600');

  const interval = setInterval(() => {
    try {
      if (newWindow.closed) {
        clearInterval(interval);
        const locationUrl = prompt(
          'Enter the URL of the selected location from Google Maps:'
        );
        if (locationUrl) {
          setFormData((prevData) => ({
            ...prevData,
            location: locationUrl,
          }));
        }
      }
    } catch (error) {
      console.error('Error getting location URL:', error);
    }
  }, 500);
};
