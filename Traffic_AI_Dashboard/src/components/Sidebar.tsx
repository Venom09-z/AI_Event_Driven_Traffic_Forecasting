import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Users, BarChart2, Activity, MapPin } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/forecast', label: 'Forecast', icon: TrendingUp },
  { to: '/resource-planning', label: 'Resources', icon: Users },
  { to: '/post-event-analysis', label: 'Analysis', icon: BarChart2 },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col z-40" style={{ background: 'linear-gradient(175deg, #1e3a5f 0%, #0f2340 40%, #0a1628 100%)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', boxShadow: '0 4px 14px rgb(59 130 246 / 0.5)' }}>
          <Activity size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">TrafficOps</p>
          <p className="text-blue-300 text-xs opacity-80">Bangalore City</p>
        </div>
      </div>

      {/* Section label */}
      <div className="px-6 mb-2">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest opacity-60">Main Menu</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'text-white'
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-3 w-1 h-8 rounded-r-full bg-blue-400" style={{ boxShadow: '0 0 8px rgb(96 165 250 / 0.8)' }} />
                )}
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-white/5 group-hover:bg-white/10'}`}>
                  <Icon size={17} />
                </span>
                <span>{label}</span>
                {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: '0 0 6px rgb(96 165 250)' }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={14} className="text-blue-400" />
          <p className="text-xs font-semibold text-blue-300">Live Status</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-200 opacity-70">Active Zones</span>
            <span className="text-xs font-bold text-white">10</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-200 opacity-70">High Risk</span>
            <span className="text-xs font-bold text-red-400">5</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-200 opacity-70">Avg Delay</span>
            <span className="text-xs font-bold text-amber-400">28.4 min</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
            BL
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Traffic Admin</p>
            <p className="text-blue-300 text-xs opacity-60">Bangalore Region</p>
          </div>
          <span className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ boxShadow: '0 0 6px rgb(52 211 153)' }} />
        </div>
      </div>
    </aside>
  );
}
