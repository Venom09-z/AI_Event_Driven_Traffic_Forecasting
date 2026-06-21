import { useState } from 'react';
import {
  RadialBarChart, RadialBar, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import { Zap, AlertTriangle, Clock, Activity, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { zoneOptions } from '../data/eventData';

interface ForecastForm {
  eventType: string;
  zone: string;
  attendees: string;
  duration: string;
  dayOfWeek: string;
  timeOfDay: string;
  hasRoadClosure: boolean;
}

interface Prediction {
  risk: string;
  riskScore: number;
  delay: number;
  congestion: number;
  confidence: number;
}

function computePrediction(form: ForecastForm): Prediction {
  const attendeeNum = parseInt(form.attendees) || 0;
  const durationNum = parseInt(form.duration) || 1;

  let base = 0;
  if (form.eventType === 'Concert') base += 35;
  else if (form.eventType === 'Marathon') base += 40;
  else if (form.eventType === 'Festival') base += 30;
  else if (form.eventType === 'Sports') base += 25;
  else base += 15;

  if (form.dayOfWeek === 'Friday' || form.dayOfWeek === 'Saturday') base += 15;
  if (form.timeOfDay === 'Evening') base += 20;
  else if (form.timeOfDay === 'Morning') base += 10;
  if (form.hasRoadClosure) base += 20;
  if (attendeeNum > 10000) base += 20;
  else if (attendeeNum > 5000) base += 12;
  else if (attendeeNum > 1000) base += 5;

  const riskScore = Math.min(100, base);
  let risk = 'Low';
  if (riskScore >= 65) risk = 'High';
  else if (riskScore >= 35) risk = 'Medium';

  const delay = Math.round((riskScore / 100) * 60 * (durationNum / 2));
  const congestion = Math.round(riskScore * 0.95);
  const confidence = Math.max(70, 95 - Math.abs(riskScore - 50) * 0.3);

  return { risk, riskScore, delay, congestion, confidence: Math.round(confidence) };
}

const RISK_COLOR: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#22c55e',
};

const RISK_GRADIENT: Record<string, string> = {
  High: 'linear-gradient(135deg, #ef4444, #f97316)',
  Medium: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  Low: 'linear-gradient(135deg, #22c55e, #10b981)',
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}
function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";

export default function Forecast() {
  const [form, setForm] = useState<ForecastForm>({
    eventType: 'Concert',
    zone: 'Silk Board',
    attendees: '5000',
    duration: '4',
    dayOfWeek: 'Friday',
    timeOfDay: 'Evening',
    hasRoadClosure: false,
  });

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setPrediction(computePrediction(form));
      setLoading(false);
    }, 800);
  };

  const gaugeData = prediction
    ? [{ name: 'Risk', value: prediction.riskScore, fill: RISK_COLOR[prediction.risk] }]
    : [];

  const metricsData = prediction
    ? [
        { label: 'Delay', value: prediction.delay, fill: '#3b82f6' },
        { label: 'Congestion', value: prediction.congestion, fill: '#f59e0b' },
        { label: 'Confidence', value: prediction.confidence, fill: '#22c55e' },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-6">
        {/* Form */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
          {/* Form header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 4px 12px rgb(59 130 246 / 0.3)' }}>
              <SlidersHorizontal size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Event Parameters</h2>
              <p className="text-xs text-gray-400">Configure details for prediction</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <Field label="Event Type">
              <select className={inputCls} value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })}>
                {['Concert', 'Marathon', 'Festival', 'Sports', 'Conference', 'Parade'].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Zone">
              <select className={inputCls} value={form.zone} onChange={e => setForm({ ...form, zone: e.target.value })}>
                {zoneOptions.map(z => <option key={z}>{z}</option>)}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Attendees">
                <input type="number" className={inputCls} value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} min={0} />
              </Field>
              <Field label="Duration (hrs)">
                <input type="number" className={inputCls} value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} min={1} max={24} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Day of Week">
                <select className={inputCls} value={form.dayOfWeek} onChange={e => setForm({ ...form, dayOfWeek: e.target.value })}>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Time of Day">
                <select className={inputCls} value={form.timeOfDay} onChange={e => setForm({ ...form, timeOfDay: e.target.value })}>
                  {['Morning','Afternoon','Evening','Night'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group p-3.5 bg-gray-50 rounded-xl hover:bg-blue-50/50 transition-colors border border-gray-200 hover:border-blue-200">
              <div className="relative flex-shrink-0">
                <input type="checkbox" className="sr-only" checked={form.hasRoadClosure} onChange={e => setForm({ ...form, hasRoadClosure: e.target.checked })} />
                <div className={`w-11 h-6 rounded-full transition-colors ${form.hasRoadClosure ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.hasRoadClosure ? 'translate-x-5' : ''}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Road Closure Expected</p>
                <p className="text-xs text-gray-400">Adds +20 to risk score</p>
              </div>
            </label>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-60 relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', boxShadow: '0 4px 14px rgb(59 130 246 / 0.4)' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Predict Risk & Impact
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-3 space-y-5">
          {!prediction ? (
            <div className="bg-white rounded-2xl border border-gray-100 h-full flex items-center justify-center p-12" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
                  <Activity size={36} className="text-blue-300" />
                </div>
                <p className="text-gray-800 font-bold text-lg">No Prediction Yet</p>
                <p className="text-gray-400 text-sm mt-1">Configure event details and click Predict</p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="w-6 h-2 rounded-full bg-blue-200" />
                  <span className="w-2 h-2 rounded-full bg-blue-100" />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Risk Banner */}
              <div className="rounded-2xl p-6 flex items-center gap-5 text-white relative overflow-hidden" style={{ background: RISK_GRADIENT[prediction.risk], boxShadow: `0 8px 24px ${RISK_COLOR[prediction.risk]}40` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/20">
                  <AlertTriangle size={30} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-xs font-medium mb-0.5">Predicted Risk Level</p>
                  <p className="text-3xl font-bold">{prediction.risk} Risk</p>
                  <p className="text-white/80 text-sm mt-1">Score: {prediction.riskScore}/100 · Confidence: {prediction.confidence}%</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                    <span className="text-xl font-black">{prediction.riskScore}</span>
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute right-4 top-0 w-32 h-32 rounded-full bg-white/5" />
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: 'Predicted Delay', value: `${prediction.delay} min`, color: '#3b82f6', bg: '#eff6ff', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
                  { icon: Activity, label: 'Congestion Score', value: prediction.congestion.toString(), color: '#f59e0b', bg: '#fffbeb', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
                  { icon: Zap, label: 'Model Confidence', value: `${prediction.confidence}%`, color: '#10b981', bg: '#f0fdf4', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: m.bg }}>
                        <Icon size={20} style={{ color: m.color }} />
                      </div>
                      <p className="text-2xl font-black text-gray-900">{m.value}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{m.label}</p>
                      <div className="mt-3 h-1 rounded-full" style={{ background: m.gradient }} />
                    </div>
                  );
                })}
              </div>

              {/* Gauge + Bar */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Risk Score Gauge</h3>
                  <ResponsiveContainer width="100%" height={175}>
                    <RadialBarChart
                      innerRadius="60%"
                      outerRadius="95%"
                      data={[{ value: 100, fill: '#f3f4f6' }, ...gaugeData]}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar dataKey="value" cornerRadius={10} />
                      <text x="50%" y="55%" textAnchor="middle" fill={RISK_COLOR[prediction.risk]} fontSize={36} fontWeight="900">
                        {prediction.riskScore}
                      </text>
                      <text x="50%" y="72%" textAnchor="middle" fill="#9ca3af" fontSize={12}>out of 100</text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: '0 2px 8px rgb(0 0 0 / 0.05)' }}>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Impact Summary</h3>
                  <ResponsiveContainer width="100%" height={175}>
                    <BarChart data={metricsData} barSize={38}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" vertical={false} />
                      <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgb(0 0 0 / 0.08)', fontSize: 12 }} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {metricsData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
