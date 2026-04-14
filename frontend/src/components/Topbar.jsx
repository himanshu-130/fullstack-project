import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Topbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between w-full">
      <div
        className="flex items-center px-4 py-2.5 rounded-xl w-1/2"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
        }}
      >
        <span className="material-symbols-outlined mr-2" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>search</span>
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
          style={{ color: 'var(--text-primary)', '::placeholder': { color: 'var(--text-muted)' } }}
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-secondary)',
          }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* User Badge */}
        <div
          className="px-4 py-2.5 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-primary)',
          }}
        >
          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)', fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="font-medium text-sm">{user?.name?.split(' ')[0] || 'User'}</span>
        </div>
      </div>
    </div>
  );
}