import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WeekView from './routes/WeekView';
import DayView from './routes/DayView';
import MonthView from './routes/MonthView';
import Settings from './routes/Settings';

export default function App() {
  const today = new Date().toISOString().split('T')[0];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/week/${today}`} />} />
        <Route path="/week/:date" element={<WeekView />} />
        <Route path="/day/:date" element={<DayView />} />
        <Route path="/month/:date" element={<MonthView />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}