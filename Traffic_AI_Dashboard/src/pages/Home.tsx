import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend,
} from 'recharts';
import { Activity, Clock, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { summaryStats, riskDistribution, topHighRiskZones, monthlyTrend, avgCongestionByRisk } from '../data/eventData';

const RISK_COLORS: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#22c55e',
};

const STAT_CARDS = [
  {
    title: 'Total Events',
    value: '2,176',
    sub: 'All monitored zones',
    trend: '+12.4%',
    up: true,
    icon: Activity,
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    glow: 'rgb(59 130 246 / 0.25)',
    bg: '#eff6ff',
    iconColor: '#3b82f6',
  },
  {
    title: 'Average Delay',
    value: '28.4 min',
    sub: 'Mean across all events',
    trend: '-8.2%',
    up: false,
    icon: Clock,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    glow: 'rgb(245 158 11 / 0.25)',
    bg: '#fffbeb',
    iconColor: '#f59e0b',
  },
  {
    title: 'High-Risk Events',
    value: '920',
    sub: '42.3% of total events',
    trend: '+5.1%',
    up: true,
    icon: AlertTriangle,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    glow: 'rgb(239 68 68 / 0.25)',
    bg: '#fef2f2',
    iconColor: '#ef4444',
  },
  {
    title: 'Risk Index',
    value: '6.8 / 10',
    sub: 'Composite risk score',
    trend: '+0.4',
    up: false,
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    glow: 'rgb(16 185 129 / 0.25)',
    bg: '#f0fdf4',
    iconColor: '#10b981',
  },
];

export default function Home() {
  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-blue-300 text-sm font-medium mb-1">Good morning, Traffic Admin</p>
          <h2 className="text-white text-2xl font-bold mb-2">Bangalore Traffic Overview</h2>
          <p className="text-blue-200 text-sm opacity-70">Real-time intelligence across 10 monitored zones · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="text-right">
            <p className="text-blue-300 text-xs mb-1">System Status</p>
            <div className="flex items-center justify-end gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px #34d399' }} />
              <span className="text-white text-sm font-semibold">All Systems Live</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(96,165,250,0.3)' }}>
            <Zap size={28} className="text-blue-300" />
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-40 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-5 bg-blue-300" />
        <div className="absolute right-24 -top-8 w-24 h-24 rounded-full opacity-5 bg-cyan-300" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon size={22} style={{ color: card.iconColor }} />
                </div>
                <span
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: card.up ? '#f0fdf4' : '#fef2f2', color: card.up ? '#16a34a' : '#dc2626' }}
                >
                  {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-sm font-semibold text-gray-700">{card.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              {/* Bottom gradient bar */}
              <div className="mt-4 h-1 rounded-full" style={{ background: card.gradient }} />
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-5 gap-6">
        {/* Area Chart */}
        <div className="col-span-3 bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Monthly Event Trend</h2>
              <p className="text-xs text-gray-400 mt-0.5">12-month breakdown by risk category</p>
            </div>
            <div className="flex items-center gap-4">
              {[{c:'#ef4444',l:'High'},{c:'#f59e0b',l:'Medium'},{c:'#22c55e',l:'Low'}].map(e=>(
                <span key={e.l} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full" style={{ background: e.c }} />{e.l}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgb(0 0 0 / 0.08)', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2.5} fill="url(#highGrad)" dot={false} name="High" />
              <Area type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2.5} fill="url(#medGrad)" dot={false} name="Medium" />
              <Area type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2.5} fill="url(#lowGrad)" dot={false} name="Low" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut + breakdown */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Traffic Risk Share</h2>
              <p className="text-xs text-gray-400 mt-0.5">By risk category</p>
            </div>
          </div>
          <div className="relative">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={3}
                  stroke="none"
                >
                  {riskDistribution.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v: number) => `${v}%`}
                  contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgb(0 0 0 / 0.08)', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-gray-900">2,176</p>
              <p className="text-xs text-gray-400">Total Events</p>
            </div>
          </div>
          <div className="space-y-2.5 mt-3">
            {riskDistribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  {d.name} Risk
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-10 text-right">{d.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-5 gap-6">
        {/* Congestion chart */}
        <div className="col-span-3 bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Congestion Score by Risk</h2>
              <p className="text-xs text-gray-400 mt-0.5">Average congestion per risk category</p>
            </div>
          </div>
          <div className="space-y-5">
            {avgCongestionByRisk.map((d) => (
              <div key={d.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: RISK_COLORS[d.category] }} />
                    {d.category} Risk
                  </span>
                  <span className="text-lg font-bold text-gray-900">{d.score}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.score}%`, background: RISK_COLORS[d.category] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Zones */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Top High-Risk Zones</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by event count</p>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Bangalore</span>
          </div>
          <div className="space-y-3">
            {topHighRiskZones.slice(0, 6).map((z, i) => (
              <div key={z.zone} className="flex items-center gap-4">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: i < 3 ? '#fef2f2' : '#f0f9ff', color: i < 3 ? '#dc2626' : '#0284c7' }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800 truncate">{z.zone}</span>
                    <span className="text-sm font-bold text-gray-600 ml-2 flex-shrink-0">{z.events}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(z.events / 385) * 100}%`,
                        background: i < 3 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
