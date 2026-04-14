import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [biometric, setBiometric] = useState(true);
  const [incognito, setIncognito] = useState(false);
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('arthveda-profile-image') || null;
  });
  const [displayName, setDisplayName] = useState(user?.name || 'Ritesh');
  const [email, setEmail] = useState(user?.email || 'ritesh@arthveda.com');

  const handleComingSoon = () => toast.info('Feature coming soon!');

  const handleSave = () => {
    localStorage.setItem('arthveda-profile-image', profileImage || '');
    toast.success('Settings saved successfully!');
  };

  const handleDiscard = () => {
    toast.warn('Changes discarded');
    setTheme('dark');
    setBiometric(true);
    setIncognito(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfileImage(ev.target.result);
      localStorage.setItem('arthveda-profile-image', ev.target.result);
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    localStorage.removeItem('arthveda-profile-image');
    toast.info('Profile photo removed');
  };

  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <h2
          className="text-3xl font-extrabold tracking-tight mb-1"
          style={{ color: 'var(--text-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Settings
        </h2>
        <p style={{ color: 'var(--text-secondary)' }} className="text-base">
          Customize your ArthVeda experience and preferences.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* ═══ Left Column ═══ */}
        <div className="col-span-12 lg:col-span-7 space-y-6">

          {/* ── Profile Section ── */}
          <section
            className="rounded-2xl p-8 transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="flex items-center gap-6 mb-8">
              {/* Profile Photo with Upload */}
              <div className="relative group">
                <div
                  className="h-24 w-24 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    border: '3px solid var(--accent)',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  {profileImage ? (
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src={profileImage}
                    />
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '48px',
                        color: 'var(--text-muted)',
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      person
                    </span>
                  )}
                </div>

                {/* Edit overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <span className="material-symbols-outlined text-white text-lg">photo_camera</span>
                </button>

                {/* Small edit badge */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-full shadow-lg transition-transform hover:scale-110"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>edit</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>

              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: 'var(--text-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {displayName}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  Premium Member since 2026
                </p>
                {profileImage && (
                  <button
                    onClick={handleRemovePhoto}
                    className="text-xs mt-1 transition-colors"
                    style={{ color: 'var(--danger)' }}
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold ml-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Display Name
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-input)',
                    color: 'var(--text-primary)',
                  }}
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold ml-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Email Address
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-input)',
                    color: 'var(--text-primary)',
                  }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* ── Theme & Currency Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Visual Mode */}
            <section
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                  </span>
                </div>
                <h4
                  className="font-bold"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Visual Mode
                </h4>
              </div>

              <div
                className="flex p-1 rounded-full"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <button
                  onClick={() => setTheme('light')}
                  className="flex-1 py-2.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: theme === 'light' ? 'var(--accent)' : 'transparent',
                    color: theme === 'light' ? 'white' : 'var(--text-muted)',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(5,150,105,0.3)' : 'none',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>light_mode</span>
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className="flex-1 py-2.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: theme === 'dark' ? 'var(--accent)' : 'transparent',
                    color: theme === 'dark' ? 'white' : 'var(--text-muted)',
                    boxShadow: theme === 'dark' ? '0 2px 8px rgba(52,211,153,0.3)' : 'none',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
                  Dark
                </button>
              </div>
            </section>

            {/* Base Currency */}
            <section
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: 'var(--info-subtle)', color: 'var(--info)' }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    payments
                  </span>
                </div>
                <h4
                  className="font-bold"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Base Currency
                </h4>
              </div>
              <select
                className="w-full rounded-full px-4 py-2.5 text-sm font-medium appearance-none cursor-pointer outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
              </select>
            </section>
          </div>

          {/* ── Security & Privacy ── */}
          <section
            className="rounded-2xl p-8"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: 'var(--text-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Security & Privacy
            </h3>
            <div className="space-y-6">
              {/* Biometric Toggle */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 flex items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: 'var(--accent-subtle)' }}
                  >
                    <span
                      className="material-symbols-outlined transition-colors"
                      style={{ color: 'var(--accent)' }}
                    >
                      fingerprint
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>
                      Biometric Login
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Unlock with FaceID or Fingerprint
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBiometric(!biometric)}
                  className="relative inline-block w-12 h-6 rounded-full p-1 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: biometric ? 'var(--accent)' : 'var(--border-secondary)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-white transition-transform"
                    style={{ transform: biometric ? 'translateX(24px)' : 'translateX(0)' }}
                  />
                </button>
              </div>

              {/* Incognito Toggle */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 flex items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: 'var(--warning-subtle)' }}
                  >
                    <span
                      className="material-symbols-outlined transition-colors"
                      style={{ color: 'var(--warning)' }}
                    >
                      visibility_off
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>
                      Incognito Balances
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Hide totals from the main dashboard
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIncognito(!incognito)}
                  className="relative inline-block w-12 h-6 rounded-full p-1 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: incognito ? 'var(--accent)' : 'var(--border-secondary)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-white transition-transform"
                    style={{ transform: incognito ? 'translateX(24px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ═══ Right Column: Bill Reminders ═══ */}
        <div className="col-span-12 lg:col-span-5">
          <section
            className="rounded-2xl p-8 h-full sticky top-24"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: 'var(--text-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Bill Reminders
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Monthly obligations to keep in mind.
                </p>
              </div>
              <button
                onClick={handleComingSoon}
                className="h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_alert</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Rent */}
              <BillCard
                icon="home"
                title="Monthly Rent"
                subtitle="Due on the 1st of every month"
                amount="₹24,500.00"
                badge="Auto-pay enabled"
                accentColor="var(--accent)"
                onAdjust={handleComingSoon}
              />

              {/* Utilities */}
              <BillCard
                icon="bolt"
                title="Utilities (Estimated)"
                subtitle="Due on the 15th"
                amount="₹1,850.20"
                badge="Next: May 15"
                accentColor="var(--warning)"
                onAdjust={handleComingSoon}
              />

              {/* Subscription */}
              <BillCard
                icon="subscriptions"
                title="Digital Sanctuary"
                subtitle="Cloud & Entertainment bundle"
                amount="₹299.00"
                badge="Renewing Soon"
                accentColor="var(--info)"
                onAdjust={handleComingSoon}
              />
            </div>

            {/* Tip Box */}
            <div
              className="mt-8 p-5 rounded-xl"
              style={{
                backgroundColor: 'var(--accent-subtle)',
                border: '1px solid var(--accent)',
                borderColor: theme === 'dark' ? 'rgba(52,211,153,0.15)' : 'rgba(5,150,105,0.15)',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined"
                  style={{ color: 'var(--accent)', fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <div>
                  <h5 className="font-bold mb-1 text-sm" style={{ color: 'var(--accent)' }}>
                    Financial Wellness Tip
                  </h5>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Setting reminders for fixed costs helps reduce "money fog" and allows for better
                    discretionary spending throughout the month.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Actions */}
      <div
        className="mt-8 pt-8 flex justify-end gap-4"
        style={{ borderTop: '1px solid var(--border-primary)' }}
      >
        <button
          onClick={handleDiscard}
          className="px-8 py-3 rounded-full font-bold transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          Discard Changes
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 rounded-full font-bold shadow-lg transition-all hover:opacity-90"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(52,211,153,0.25)',
          }}
        >
          Save Profile
        </button>
      </div>
    </>
  );
}

/* ── Bill Reminder Card Sub-component ── */
function BillCard({ icon, title, subtitle, amount, badge, accentColor, onAdjust }) {
  return (
    <div
      className="p-5 rounded-xl transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>{title}</h4>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
          </div>
        </div>
        <span className="text-base font-bold" style={{ color: 'var(--text-heading)' }}>{amount}</span>
      </div>
      <div className="flex items-center justify-between">
        <span
          className="px-3 py-1 rounded-full font-medium text-[11px]"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {badge}
        </span>
        <button
          onClick={onAdjust}
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Adjust
        </button>
      </div>
    </div>
  );
}
