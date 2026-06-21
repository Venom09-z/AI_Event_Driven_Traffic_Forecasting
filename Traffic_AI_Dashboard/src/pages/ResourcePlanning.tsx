import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Shield, Fence, Navigation, Plus, Trash2, CheckCircle, Clock, Layers } from 'lucide-react';
import { zoneOptions, hotspotZones } from '../data/eventData';

interface ResourcePlan {
  zone: string;
  risk: string;
  police: number;
  barricades: number;
  routes: number;
  status: 'Planned' | 'Deployed' | 'Review';
}

const initialPlans: ResourcePlan[] = hotspotZones.slice(0, 8).map(z => ({
  zone: z.zone,
  risk: z.risk,
  police: z.risk === 'High' ? 24 : z.risk === 'Medium' ? 12 : 4,
  barricades: z.risk === 'High' ? 16 : z.risk === 'Medium' ? 8 : 2,
  routes: z.risk === 'High' ? 4 : z.risk === 'Medium' ? 2 : 1,
  status: z.zone === 'Silk Board' || z.zone === 'Whitefield' ? 'Deployed' : 'Planned',
}));

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Deployed: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Planned: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
  Review: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
};

const RISK_BADGE: Record<string, string> = {
  High: 'bg-red-50 text-red-700',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-emerald-50 text-emerald-700',
};

export default function ResourcePlanning() {
  const [plans, setPlans] = useState<ResourcePlan[]>(initialPlans);
  const [newZone, setNewZone] = useState(zoneOptions[0]);
  const [newRisk, setNewRisk] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const totalPolice = plans.reduce((s, p) => s + p.police, 0);
  const totalBarricades = plans.reduce((s, p) => s + p.barricades, 0);
  const totalRoutes = plans.reduce((s, p) => s + p.routes, 0);

  const chartData = plans.slice(0, 6).map(p => ({
    zone: p.zone.length > 8 ? p.zone.slice(0, 8) : p.zone,
    Police: p.police,
    Barricades: p.barricades,
    Routes: p.routes,
  }));

  const addZone = () => {
    if (plans.some(p => p.zone === newZone)) return;
    const police = newRisk === 'High' ? 24 : newRisk === 'Medium' ? 12 : 4;
    const barricades = newRisk === 'High' ? 16 : newRisk === 'Medium' ? 8 : 2;
    const routes = newRisk === 'High' ? 4 : newRisk === 'Medium' ? 2 : 1;
    setPlans(prev => [...prev, { zone: newZone, risk: newRisk, police, barricades, routes, status: 'Planned' }]);
  };

  const removeZone = (zone: string) => setPlans(prev => prev.filter(p => p.zone !== zone));

  const cycleStatus = (zone: string) => {
    const cycle: ResourcePlan['status'][] = ['Planned', 'Review', 'Deployed'];
    setPlans(prev => prev.map(p => {
      if (p.zone !== zone) return p;
      return { ...p, status: cycle[(cycle.indexOf(p.status) + 1) % cycle.length] };
    }));
  };

  const inputCls = "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: Shield, label: 'Police Personnel', value: totalPolice, gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', shadow: 'rgb(59 130 246 / 0.3)', bg: '#eff6ff', color: '#3b82f6' },
          { icon: Fence, label: 'Barricades Required', value: totalBarricades, gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', shadow: 'rgb(245 158 11 / 0.3)', bg: '#fffbeb', color: '#f59e0b' },
          { icon: Navigation, label: 'Diversion Routes', value: totalRoutes, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', shadow: 'rgb(16 185 129 / 0.3)', bg: '#f0fdf4', color: '#10b981' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: card.bg }}>
                <Icon size={26} style={{ color: card.color }} />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-black text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">{card.label}</p>
              </div>
              <div className="w-1.5 h-12 rounded-full" style={{ background: card.gradient }} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Table */}
        <div className="col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 4px 12px rgb(59 130 246 / 0.3)' }}>
                <Layers size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Zone Allocation</h2>
                <p className="text-xs text-gray-400">{plans.length} zones configured</p>
              </div>
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: '360px' }}>
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80 sticky top-0">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Zone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Risk</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Police</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Barricades</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Routes</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => {
                  const s = STATUS_STYLES[p.status];
                  return (
                    <tr key={p.zone} className="border-t border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-gray-900">{p.zone}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${RISK_BADGE[p.risk]}`}>{p.risk}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-gray-700">{p.police}</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-gray-700">{p.barricades}</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-gray-700">{p.routes}</td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => cycleStatus(p.zone)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold transition-all hover:shadow-sm mx-auto ${s.bg} ${s.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {p.status}
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => removeZone(p.zone)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Zone */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-gray-50/50">
            <select value={newZone} onChange={e => setNewZone(e.target.value)} className={`flex-1 ${inputCls}`}>
              {zoneOptions.filter(z => !plans.some(p => p.zone === z)).map(z => <option key={z}>{z}</option>)}
            </select>
            <select value={newRisk} onChange={e => setNewRisk(e.target.value as 'High' | 'Medium' | 'Low')} className={inputCls}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={addZone}
              className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 4px 12px rgb(59 130 246 / 0.3)' }}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-5">
          {/* Chart */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <h2 className="text-sm font-bold text-gray-900 mb-4">Resource Breakdown</h2>
            <ResponsiveContainer width="100%" height={195}>
              <BarChart data={chartData} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" vertical={false} />
                <XAxis dataKey="zone" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgb(0 0 0 / 0.08)', fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                <Bar dataKey="Police" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Barricades" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Routes" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Summary */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <h2 className="text-sm font-bold text-gray-900">Deployment Status</h2>
            {(['Deployed', 'Planned', 'Review'] as const).map(s => {
              const count = plans.filter(p => p.status === s).length;
              const pct = plans.length > 0 ? Math.round((count / plans.length) * 100) : 0;
              const colors = { Deployed: '#10b981', Planned: '#3b82f6', Review: '#f59e0b' };
              const icons = { Deployed: CheckCircle, Planned: Clock, Review: Clock };
              const Icon = icons[s];
              return (
                <div key={s}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Icon size={14} style={{ color: colors[s] }} />
                      {s}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900">{count}</span>
                      <span className="text-xs text-gray-400">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: colors[s] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Recommendation */}
          <div className="rounded-2xl p-5 border relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)', borderColor: 'rgba(96,165,250,0.2)' }}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-blue-500/20">
                  <Shield size={13} className="text-blue-300" />
                </div>
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wide">AI Recommendation</p>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                <span className="font-bold text-white">Silk Board</span> has the highest concentration of high-risk events. Pre-position <span className="font-bold text-amber-300">12 officers</span> and <span className="font-bold text-amber-300">6 barricades</span> before 6 PM peak.
              </p>
            </div>
            <div className="absolute right-3 bottom-3 w-16 h-16 rounded-full bg-blue-400/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
