export const handleDarkMode = (isDark) => {
  if (!window) return;
  if (isDark) {
    var r = window.document.querySelector(':root');
    r.style.setProperty('--primary-background', '#1a1a1a');
    r.style.setProperty('--bg-elevation-1', '#282828');
    r.style.setProperty('--bg-elevation-1c', '#2f2e2e');
    r.style.setProperty('--bg-elevation-2', '#2f2e2e');
    r.style.setProperty('--primary-text-color', '#ffff');
    r.style.setProperty('--header-bg-color', '#1a1a1a');
    r.style.setProperty('--action-icons-color', '#9ca3af');
    r.style.setProperty('--header-divider-color', 'rgba(255, 255, 255, 0.195)');
    r.style.setProperty('--header-padding', '1.8rem 3rem');
    r.style.setProperty('--header-marginBottom', '0rem');
    r.style.setProperty('--navigation-border-color', '#ffffff23');
  } else {
    var r = window.document.querySelector(':root');
    r.style.setProperty('--primary-background', '#f3f4f6');
    r.style.setProperty('--bg-elevation-1', '#ffffff');
    r.style.setProperty('--bg-elevation-1c', '#f3f5f7');
    r.style.setProperty('--bg-elevation-2', '#f9fafb');
    r.style.setProperty('--primary-text-color', '#111827');
    r.style.setProperty('--header-bg-color', '#ffffff');
    r.style.setProperty('--action-icons-color', '#4f555e');
    r.style.setProperty('--header-divider-color', 'rgba(0, 0, 0, 0.195)');
    r.style.setProperty('--header-padding', '1.2rem 3rem');
    r.style.setProperty('--header-marginBottom', '0.8rem');
    r.style.setProperty('--navigation-border-color', '#00000023');
  }
};
