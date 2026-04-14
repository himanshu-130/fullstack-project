import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [biometric, setBiometric] = useState(true);
  const [incognito, setIncognito] = useState(false);

  const handleComingSoon = () => toast.info('Feature coming soon!');
  const handleSave = () => toast.success('Settings saved successfully!');
  const handleDiscard = () => {
    toast.warn('Changes discarded');
    setTheme('dark');
    setBiometric(true);
    setIncognito(false);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Settings</h2>
        <p className="text-on-surface-variant text-lg">Curate your financial sanctuary and notification preferences.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Profile & General Settings */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          {/* User Profile Section */}
          <section className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 transition-all hover:shadow-[0_8px_32px_rgba(48,51,48,0.08)] shadow-[0_8px_32px_rgba(48,51,48,0.03)] border border-[var(--color-outline-variant)]/5">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-surface-container-low">
                  <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOoHKB_KLsr1RSgeD7iVvaHvvOiOORLhJlj4my0JY4d3RNbvAC2bkS9HKI9M6onLuxQ1Tf_YdMnhc6VFN5R5zF4kLM86WBcDP3qAnUE8PKP1ZYCzrFgXN7QGOkVhrOLj0b-V--EWGs-WVp9GSG9lxz1QZ08j10xIsZD_Ji_A2zSD3mL04v125rq9eamHznrhxU5kzqqSm_HEEZPiaNqGT3ZyKGVF-mq-UHhuXiLONvjwKeH7TzyioEWVFwMeYQp6iLQMtBvDKzrvqy"/>
                </div>
                <button onClick={handleComingSoon} className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-[var(--color-primary-dim)] transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-on-surface font-headline">Ritesh</h3>
                <p className="text-on-surface-variant">Premium Sanctuary Member since 2026</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant ml-2">Display Name</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-white outline-none" type="text" defaultValue="Ritesh" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant ml-2">Email Address</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-white outline-none" type="email" defaultValue="ritesh@mindfulledger.com" />
              </div>
            </div>
          </section>

          {/* Preference Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-surface-container-low rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dark_mode</span>
                  </div>
                  <h4 className="font-bold font-headline text-white">Visual Mode</h4>
                </div>
              </div>
              <div className="flex bg-[var(--color-surface-container-highest)] p-1 rounded-full">
                <button onClick={() => setTheme('light')} className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-white'}`}>Light</button>
                <button onClick={() => setTheme('dark')} className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${theme === 'dark' ? 'bg-slate-700 shadow-sm text-white' : 'text-on-surface-variant hover:text-white'}`}>Dark</button>
              </div>
            </section>
            
            <section className="bg-surface-container-low rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--color-secondary)]/10 p-2 rounded-lg text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>payments</span>
                  </div>
                  <h4 className="font-bold font-headline text-white">Base Currency</h4>
                </div>
              </div>
              <select className="w-full bg-[var(--color-surface-container-highest)] border-none rounded-full px-4 py-2 text-sm font-medium appearance-none cursor-pointer outline-none text-white">
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
              </select>
            </section>
          </div>

          {/* Privacy & Security */}
          <section className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 border border-[var(--color-outline-variant)]/10">
            <h3 className="text-xl font-bold mb-6 font-headline text-white">Security & Privacy</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-on-surface/5 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">fingerprint</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Biometric Login</p>
                    <p className="text-sm text-on-surface-variant">Unlock with FaceID or Fingerprint</p>
                  </div>
                </div>
                <div onClick={() => setBiometric(!biometric)} className={`relative inline-block w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${biometric ? 'bg-[var(--color-secondary)]' : 'bg-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${biometric ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-on-surface/5 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">visibility_off</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Incognito Balances</p>
                    <p className="text-sm text-on-surface-variant">Hide totals from the main dashboard</p>
                  </div>
                </div>
                <div onClick={() => setIncognito(!incognito)} className={`relative inline-block w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${incognito ? 'bg-[var(--color-secondary)]' : 'bg-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${incognito ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Bill Reminders */}
        <div className="col-span-12 lg:col-span-5">
          <section className="bg-surface-container-low rounded-xl p-8 h-full sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-headline">Bill Reminders</h3>
                <p className="text-on-surface-variant text-sm">Monthly obligations to keep in mind.</p>
              </div>
              <button onClick={handleComingSoon} className="h-12 w-12 rounded-full bg-[var(--color-surface-container-highest)] text-white flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_alert</span>
              </button>
            </div>
            <div className="space-y-6">
              {/* Rent Reminder */}
              <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-lg shadow-sm border-l-4 border-primary">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Monthly Rent</h4>
                      <p className="text-xs text-on-surface-variant">Due on the 1st of every month</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white">₹24,500.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Auto-pay enabled</span>
                  <button onClick={handleComingSoon} className="text-on-surface-variant hover:text-white transition-colors font-medium">Adjust</button>
                </div>
              </div>

              {/* Utilities Reminder */}
              <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-lg shadow-sm border-l-4 border-[var(--color-tertiary)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[var(--color-tertiary)]/5 rounded-full flex items-center justify-center text-[var(--color-tertiary)]">
                      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Utilities (Estimated)</h4>
                      <p className="text-xs text-on-surface-variant">Due on the 15th</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white">₹1,850.20</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] px-3 py-1 rounded-full font-medium">Next: May 15</span>
                  <button onClick={handleComingSoon} className="text-on-surface-variant hover:text-white transition-colors font-medium">Adjust</button>
                </div>
              </div>

              {/* Subscription Reminder */}
              <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-lg shadow-sm border-l-4 border-[var(--color-secondary)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[var(--color-secondary)]/5 rounded-full flex items-center justify-center text-[var(--color-secondary)]">
                      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>subscriptions</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Digital Sanctuary</h4>
                      <p className="text-xs text-on-surface-variant">Cloud & Entertainment bundle</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white">₹299.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-3 py-1 rounded-full font-medium">Renewing Soon</span>
                  <button onClick={handleComingSoon} className="text-on-surface-variant hover:text-white transition-colors font-medium">Adjust</button>
                </div>
              </div>
            </div>

            {/* Subtle Motivation/Insight */}
            <div className="mt-12 p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent rounded-xl border border-indigo-100/50 dark:border-indigo-900/50">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                <div>
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Financial Wellness Tip</h5>
                  <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80 leading-relaxed">Setting reminders for fixed costs helps reduce "money fog" and allows for better discretionary spending throughout the month.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-8 border-t border-surface-container-low pt-8 flex justify-end gap-4">
        <button onClick={handleDiscard} className="px-8 py-3 rounded-full font-bold text-on-surface-variant hover:bg-slate-800 transition-colors">Discard Changes</button>
        <button onClick={handleSave} className="px-8 py-3 rounded-full font-bold bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Save Sanctuary Profile</button>
      </div>
    </>
  );
}
