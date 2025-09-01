import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  themeColor: string;
}

interface StoreState {
  tasks: Task[];
  appointments: Appointment[];
  labels: Label[];
  settings: Settings;
}

export const useStore = create<StoreState>()(
  persist<StoreState>(
    () => ({
      tasks: [],
      appointments: [],
      labels: [],
      settings: { themeColor: '#3b82f6' },
    }),
    { name: 'chronio-store' }
  )
);