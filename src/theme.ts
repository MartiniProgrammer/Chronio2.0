export const themes = {
  ocean: {
    name: 'Ocean',
    bg: 'bg-sky-50',
    primary: 'text-sky-700',
    secondary: 'text-sky-500',
    accent: 'bg-sky-500',
  },
  forest: {
    name: 'Forest',
    bg: 'bg-emerald-50',
    primary: 'text-emerald-700',
    secondary: 'text-emerald-500',
    accent: 'bg-emerald-500',
  },
  sunset: {
    name: 'Sunset',
    bg: 'bg-orange-50',
    primary: 'text-orange-700',
    secondary: 'text-orange-500',
    accent: 'bg-orange-500',
  },
} as const;

export type ThemeName = keyof typeof themes;