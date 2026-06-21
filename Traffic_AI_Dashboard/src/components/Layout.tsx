import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  '/': { title: 'Dashboard Overview', sub: 'Real-time traffic intelligence for Bangalore' },
  '/forecast': { title: 'Traffic Forecast', sub: 'Predict risk and congestion for planned events' },
  '/resource-planning': { title: 'Resource Planning', sub: 'Allocate police, barricades, and diversion routes' },
  '/post-event-analysis': { title: 'Post-Event Analysis', sub: 'Comprehensive review of traffic outcomes' },
};

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const location = useLocation();
  const meta = PAGE_TITLES[location.pathname] ?? PAGE_TITLES['/'];

  return (
    <div className="flex min-h-screen" style={{ background: '#f5f6fa' }}>
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100" style={{ boxShadow: '0 1px 0 0 #f0f0f0' }}>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{meta.title}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{meta.sub}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-56">
              <Search size={15} className="text-gray-400" />
              <input
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                placeholder="Search zones..."
              />
            </div>
            <button className="relative w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Bell size={17} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                BL
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Admin</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
