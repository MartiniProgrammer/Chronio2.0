import { useStore } from '../store';
import { themes } from '../theme';

export default function MonthView() {
  const theme = themes[useStore((s) => s.settings.theme)];
  return (
    <div>
      <h1 className={`text-2xl font-bold mb-4 ${theme.primary}`}>Monthly Planner</h1>
      <p className="text-gray-600">Overview your month at a glance.</p>
    </div>
  );
}