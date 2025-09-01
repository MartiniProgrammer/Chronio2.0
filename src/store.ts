import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeName } from './theme';

export interface Task {
  id: string;
  title: string;
  start: string;
  end: string;
  labelId?: string;
  colorOverride?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Settings {
  theme: ThemeName;
}

interface StoreState {
  tasks: Task[];
  appointments: Appointment[];
  labels: Label[];
  settings: Settings;
  setTheme: (theme: ThemeName) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      tasks: [],
      appointments: [],
      labels: [],
      settings: { theme: 'ocean' },
      setTheme: (theme) =>
        set((state) => ({ settings: { ...state.settings, theme } })),
    }),
    { name: 'chronio-store' }
  )
);