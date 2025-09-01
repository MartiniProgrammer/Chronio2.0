import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../store';
import { themes } from '../theme';
import type { ThemeName } from '../theme';

export default function Layout() {
  const { settings, setTheme } = useStore();
  const [open, setOpen] = useState(false);
  const theme = themes[settings.theme];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`${theme.bg} min-h-screen text-gray-800`}>
      <header className="bg-white shadow flex justify-between items-center px-4 py-2">
        <nav className="space-x-2">
          <NavLink
            to={`/day/${today}`}
            className={({ isActive }) =>
              `px-3 py-1 rounded hover:bg-gray-100 ${
                isActive ? theme.secondary : ''
              }`
            }
          >
            Day
          </NavLink>
          <NavLink
            to={`/week/${today}`}
            className={({ isActive }) =>
              `px-3 py-1 rounded hover:bg-gray-100 ${
                isActive ? theme.secondary : ''
              }`
            }
          >
            Week
          </NavLink>
          <NavLink
            to={`/month/${today}`}
            className={({ isActive }) =>
              `px-3 py-1 rounded hover:bg-gray-100 ${
                isActive ? theme.secondary : ''
              }`
            }
          >
            Month
          </NavLink>
        </nav>
        <div className="relative">
          <button
            aria-label="settings"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
              {Object.entries(themes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key as ThemeName);
                    setOpen(false);
                  }}
                  className="flex w-full items-center px-2 py-1 text-sm hover:bg-gray-100"
                >
                  <span
                    className={`h-3 w-3 rounded-full mr-2 ${value.accent}`}
                  ></span>
                  {value.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}