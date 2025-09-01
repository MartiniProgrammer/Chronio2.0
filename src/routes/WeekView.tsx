import { useStore } from '../store';
import { themes } from '../theme';

export default function WeekView() {
  const theme = themes[useStore((s) => s.settings.theme)];
  return (
    <div>
      <h1 className={`text-2xl font-bold mb-4 ${theme.primary}`}>Weekly Planner</h1>
      <p className="text-gray-600">View tasks scheduled across the week.</p>
    </div>
  );
}