import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-[1000px] mx-auto p-8 flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
        <p className="text-text-muted">Manage your account preferences and app settings.</p>
      </header>

      <div className="bg-surface-darker border border-surface-border rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Account</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-bg-dark rounded-xl border border-surface-border">
            <div>
              <p className="text-white font-medium">Display Name</p>
              <p className="text-text-muted text-sm">Alex Smith</p>
            </div>
            <button className="text-primary hover:underline font-bold text-sm">Edit</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-bg-dark rounded-xl border border-surface-border">
            <div>
              <p className="text-white font-medium">Email</p>
              <p className="text-text-muted text-sm">alex.smith@example.com</p>
            </div>
            <button className="text-primary hover:underline font-bold text-sm">Edit</button>
          </div>
        </div>
      </div>

      <div className="bg-surface-darker border border-surface-border rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Dark Mode</p>
            <p className="text-text-muted text-sm">Toggle dark/light theme</p>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
