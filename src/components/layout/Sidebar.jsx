import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Dashboard' },
  { path: '/courses', icon: 'school', label: 'Courses' },
  { path: '/writing', icon: 'edit_note', label: 'Writing' },
  { path: '/comprehension', icon: 'menu_book', label: 'Comprehension' },
  { path: '/vocabulary', icon: 'spellcheck', label: 'Vocabulary' },
  { path: '/grammar', icon: 'check_circle', label: 'Grammar' },
  { path: '/performance', icon: 'monitoring', label: 'Performance' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state here if needed
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-full border-r border-surface-border bg-surface-darker">
      {/* Logo at Top - Enhanced Visibility */}
      {/* Logo at Top - Enhanced Visibility */}
      <div className="h-20 px-6 border-b border-surface-border flex items-center justify-center relative overflow-hidden group">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
         
         <img 
           src="/logo3.png" 
           alt="Quiz Lobby" 
           className="h-24 w-auto relative z-10 drop-shadow-[0_0_15px_rgba(15,98,197,0.5)] transition-transform duration-300 group-hover:scale-105" 
         />
      </div>





      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(15,98,197,0.1)]'
                  : 'text-text-muted hover:bg-surface-light hover:text-white hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined text-[24px] transition-transform group-hover:scale-110 ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(15,98,197,0.6)]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Settings & Logout */}
      <div className="p-4 border-t border-surface-border space-y-1">
        <NavLink
          to="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-text-muted hover:bg-surface-light hover:text-white transition-all duration-200 hover:translate-x-1"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:translate-x-1"
        >
          <span className="material-symbols-outlined text-[24px]">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
