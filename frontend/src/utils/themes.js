export const LIGHT_THEME = {
  '--bg-primary': '#FAFAFA',
  '--bg-surface': '#FFFFFF',
  '--bg-card': '#FFFFFF',
  '--text-primary': '#1F2937',
  '--text-secondary': '#4B5563',
  '--text-muted': '#9CA3AF',
  '--border-color': '#E5E7EB',
  '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
  '--brand-primary': '#7C3AED',
  '--brand-primary-hover': '#6D28D9',
};

export const DARK_THEME = {
  '--bg-primary': '#0F172A',
  '--bg-surface': '#1E293B',
  '--bg-card': '#1E293B',
  '--text-primary': '#F1F5F9',
  '--text-secondary': '#94A3B8',
  '--text-muted': '#64748B',
  '--border-color': '#334155',
  '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.3)',
  '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
  '--brand-primary': '#A78BFA',
  '--brand-primary-hover': '#8B5CF6',
};

/**
 * Applies theme CSS custom properties to document root element
 * @param {'light'|'dark'} themeName Target theme name
 */
export const applyTheme = (themeName) => {
  const theme = themeName === 'dark' ? DARK_THEME : LIGHT_THEME;
  const root = document.documentElement;

  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  if (themeName === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};
