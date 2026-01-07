import React from 'react';

export default function UserProfile() {
  return (
    <div className="max-w-[1000px] mx-auto p-8 flex flex-col gap-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-8 bg-surface-darker border border-surface-border rounded-3xl">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-3xl ring-4 ring-bg-dark shadow-xl">
            AS
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-success rounded-full border-4 border-surface-darker"></div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Alex Smith</h1>
          <p className="text-text-muted text-lg">Level 4 Student · Intermediate</p>
          <div className="flex gap-2 mt-3">
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">Student</span>
             <span className="px-3 py-1 rounded-full bg-surface-light text-text-muted text-sm font-bold border border-surface-border">Member since 2024</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-darker border border-surface-border rounded-2xl p-6">
           <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">Total XP</h3>
           <p className="text-3xl font-black text-white">1,250</p>
        </div>
        <div className="bg-surface-darker border border-surface-border rounded-2xl p-6">
           <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">Current Streak</h3>
           <p className="text-3xl font-black text-orange-400">12 Days</p>
        </div>
        <div className="bg-surface-darker border border-surface-border rounded-2xl p-6">
           <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">Quizzes Taken</h3>
           <p className="text-3xl font-black text-blue-400">24</p>
        </div>
      </div>
    </div>
  );
}
