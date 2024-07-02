export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return; // Clipboard API not available
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Copying to clipboard was successful');
    },
    function (err) {
      console.error('Copying to clipboard failed', err);
    }
  );
}
