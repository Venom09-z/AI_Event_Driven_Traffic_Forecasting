import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, LineChart, Line,
} from 'recharts';
import { MapPin, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import {
  riskDistribution,
  avgCongestionByRisk,
  avgDelayByRisk,
  topHighRiskZones,
  monthlyTrend,
  hotspotZones,
} from '../data/eventData';
import HotspotMap from '../components/HotspotMap';

const RISK_COLORS: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#22c55e',
};

const TOOLTIP_STYLE = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  boxShadow: '0 8px 24px rgb(0 0 0 / 0.08)',
  fontSize: 12,
};

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 4px 10px rgb(59 130 246 / 0.3)' }}>
        <Icon size={15} className="text-white" />
      </div>
      <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{title}</h2>
    </div>
  );
}

export default function PostEventAnalysis() {
  return (
    <div className="space-y-8">
      {/* Section 1: Risk + Delay Charts */}
      <section>
        <SectionHeader icon={BarChart2} title="Risk & Impact Analysis" />
        <div className="grid grid-cols-3 gap-5">
          {/* Traffic Risk Donut */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <p className="text-sm font-bold text-gray-900 mb-0.5">Traffic Risk Share</p>
            <p className="text-xs text-gray-400 mb-3">Distribution by category</p>
            <div className="relative">
              <ResponsiveContainer width="100%" height={185}>
                <PieChart>
                  <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={3} stroke="none">
                    {riskDistribution.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-lg font-black text-gray-900">2,176</p>
                <p className="text-xs text-gray-400">Events</p>
              </div>
            </div>
            <div className="space-y-2 mt-1">
              {riskDistribution.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name}
                  </span>
                  <span className="font-bold text-gray-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avg Congestion */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <p className="text-sm font-bold text-gray-900 mb-0.5">Avg Congestion by Risk</p>
            <p className="text-xs text-gray-400 mb-3">Score per risk level</p>
            <div className="space-y-4 mt-4">
              {avgCongestionByRisk.map((d) => (
                <div key={d.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: RISK_COLORS[d.category] }} />
                      {d.category}
                    </span>
                    <span className="text-sm font-black text-gray-900">{d.score}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${d.score}%`, background: RISK_COLORS[d.category] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avg Delay */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <p className="text-sm font-bold text-gray-900 mb-0.5">Avg Delay by Risk</p>
            <p className="text-xs text-gray-400 mb-3">Delay in minutes per level</p>
            <ResponsiveContainer width="100%" height={185}>
              <BarChart data={avgDelayByRisk} barSize={52}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v} min`, 'Avg Delay']} />
                <Bar dataKey="delay" radius={[8, 8, 0, 0]}>
                  {avgDelayByRisk.map((e) => <Cell key={e.category} fill={RISK_COLORS[e.category]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 2: Zone + Monthly */}
      <section>
        <SectionHeader icon={TrendingUp} title="Zone & Temporal Patterns" />
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3 bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <p className="text-sm font-bold text-gray-900 mb-0.5">Top High-Risk Zones</p>
            <p className="text-xs text-gray-400 mb-3">Event count by zone</p>
            <div className="space-y-2.5">
              {topHighRiskZones.map((z, i) => (
                <div key={z.zone} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0" style={{ background: i < 3 ? '#fef2f2' : '#f0f9ff', color: i < 3 ? '#dc2626' : '#0284c7' }}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800 truncate">{z.zone}</span>
                      <span className="text-sm font-black text-gray-700 ml-2 flex-shrink-0">{z.events}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(z.events / 385) * 100}%`, background: i < 3 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <p className="text-sm font-bold text-gray-900 mb-0.5">Monthly Event Trend</p>
            <p className="text-xs text-gray-400 mb-3">12-month risk breakdown</p>
            <ResponsiveContainer width="100%" height={265}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2.5} dot={false} name="High" />
                <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="Medium" />
                <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2.5} dot={false} name="Low" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 3: Hotspot Map */}
      <section>
        <SectionHeader icon={MapPin} title="Geographic Hotspot Visualization" />
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900">Interactive Bangalore Traffic Map</p>
              <p className="text-xs text-gray-400 mt-0.5">Click markers for details · Scroll to zoom · Drag to pan</p>
            </div>
            <div className="p-4">
              <HotspotMap zones={hotspotZones} />
              <div className="flex items-center gap-6 mt-3 px-1">
                {Object.entries(RISK_COLORS).map(([label, color]) => (
                  <span key={label} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                    {label}
                  </span>
                ))}
                <span className="text-xs text-gray-400 ml-auto">Bubble size = event volume</span>
              </div>
            </div>
          </div>

          {/* Zone Details Table */}
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50">
                <AlertTriangle size={14} className="text-red-500" />
              </div>
              <p className="text-sm font-bold text-gray-900">Zone Coordinates</p>
            </div>
            <div className="overflow-auto" style={{ maxHeight: '360px' }}>
              <table className="w-full text-xs">
                <thead className="bg-gray-50/80 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-gray-500 font-semibold">Zone</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-semibold">Lat</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-semibold">Lng</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-semibold">Events</th>
                    <th className="text-center px-4 py-2.5 text-gray-500 font-semibold">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {hotspotZones.map((z) => (
                    <tr key={z.zone} className="border-t border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-gray-900">{z.zone}</td>
                      <td className="px-4 py-2.5 text-right text-gray-500 font-mono">{z.lat.toFixed(4)}</td>
                      <td className="px-4 py-2.5 text-right text-gray-500 font-mono">{z.lng.toFixed(4)}</td>
                      <td className="px-4 py-2.5 text-right font-black text-gray-800">{z.events}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${RISK_COLORS[z.risk]}12`, color: RISK_COLORS[z.risk] }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: RISK_COLORS[z.risk] }} />
                          {z.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
