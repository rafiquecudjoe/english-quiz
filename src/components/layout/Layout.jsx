import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const mobileNavItems = [
  { path: '/', icon: 'dashboard', label: 'Home' },
  { path: '/courses', icon: 'school', label: 'Courses' },
  { path: '/performance', icon: 'monitoring', label: 'Stats' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-surface-darker border-r border-surface-border z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 px-4 flex items-center justify-between border-b border-surface-border">
          <img src="/logo3.png" alt="Quiz Lobby" className="h-20" />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="size-10 rounded-full bg-surface-light flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { path: '/', icon: 'dashboard', label: 'Dashboard' },
            { path: '/courses', icon: 'school', label: 'Courses' },
            { path: '/writing', icon: 'edit_note', label: 'Writing' },
            { path: '/comprehension', icon: 'menu_book', label: 'Comprehension' },
            { path: '/vocabulary', icon: 'spellcheck', label: 'Vocabulary' },
            { path: '/grammar', icon: 'check_circle', label: 'Grammar' },
            { path: '/performance', icon: 'monitoring', label: 'Performance' },
            { path: '/settings', icon: 'settings', label: 'Settings' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-surface-light hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col h-full bg-bg-dark">
        {/* Global Header */}
        <header className="h-16 lg:h-20 px-4 lg:px-8 flex items-center justify-between lg:justify-end gap-4 lg:gap-6 bg-surface-darker/50 border-b border-surface-border">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden size-10 rounded-xl bg-surface-light flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Logo for mobile */}
          <img src="/logo3.png" alt="Quiz Lobby" className="h-14 lg:hidden" />

          {/* XP and Streak Badges */}
          <div className="hidden sm:flex items-center gap-3 mr-auto lg:mr-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(15,98,197,0.2)]">
              <span className="material-symbols-outlined text-primary text-[18px]">star</span>
              <span className="text-primary text-sm font-bold">1,250</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
              <span className="material-symbols-outlined text-orange-400 text-[18px]">local_fire_department</span>
              <span className="text-orange-400 text-sm font-bold">12</span>
            </div>
          </div>

          {/* Notification Button */}
          <button className="size-10 rounded-full bg-surface-light flex items-center justify-center text-white hover:bg-surface-dark transition-all hover:scale-105 relative group shadow-lg shadow-black/20">
            <div className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-pulse"></div>
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">notifications</span>
          </button>
          
          {/* User Profile - Hidden on mobile, shown in bottom nav */}
          <Link to="/profile" className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10 group cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-white text-sm font-bold leading-tight group-hover:text-primary transition-colors">Alex Smith</span>
              <span className="text-text-muted text-xs">Level 4 Student</span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-sm ring-2 ring-primary ring-offset-2 ring-offset-surface-darker shadow-[0_0_15px_rgba(15,98,197,0.4)] group-hover:scale-105 transition-transform">
                AS
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-surface-darker"></div>
            </div>
            <span className="material-symbols-outlined text-text-muted text-[20px] group-hover:text-white transition-colors">expand_more</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-darker border-t border-surface-border flex items-center justify-around px-2 z-30">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              >
                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
