
import { useStore } from '../store';
import { themes } from '../theme';

export default function DayView() {
  const theme = themes[useStore((s) => s.settings.theme)];
  return (
    <div>
      <h1 className={`text-2xl font-bold mb-4 ${theme.primary}`}>Daily Planner</h1>
      <p className="text-gray-600">Plan your day with tasks and appointments.</p>
    </div>
  );
}