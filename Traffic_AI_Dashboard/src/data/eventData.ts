// Bangalore Traffic Event Data
// Coordinates based on major traffic zones in Bangalore, India

export const riskDistribution = [
  { name: 'High', value: 42.3, color: '#ef4444' },
  { name: 'Medium', value: 35.8, color: '#f59e0b' },
  { name: 'Low', value: 21.9, color: '#22c55e' },
];

export const avgCongestionByRisk = [
  { category: 'High', score: 78 },
  { category: 'Medium', score: 52 },
  { category: 'Low', score: 18 },
];

export const avgDelayByRisk = [
  { category: 'High', delay: 45 },
  { category: 'Medium', delay: 28 },
  { category: 'Low', delay: 8 },
];

export const topHighRiskZones = [
  { zone: 'Silk Board', events: 385 },
  { zone: ' Whitefield', events: 312 },
  { zone: 'Marathahalli', events: 289 },
  { zone: 'Electronic City', events: 256 },
  { zone: 'Koramangala', events: 223 },
  { zone: 'Indiranagar', events: 198 },
  { zone: 'Hebbal', events: 167 },
  { zone: 'MG Road', events: 145 },
  { zone: 'Jayanagar', events: 112 },
  { zone: 'Yelahanka', events: 89 },
];

export const hotspotZones = [
  { zone: 'Silk Board', lat: 12.9177, lng: 77.6238, events: 385, risk: 'High' },
  { zone: 'Whitefield', lat: 12.9698, lng: 77.7500, events: 312, risk: 'High' },
  { zone: 'Marathahalli', lat: 12.9591, lng: 77.6974, events: 289, risk: 'High' },
  { zone: 'Electronic City', lat: 12.8456, lng: 77.6603, events: 256, risk: 'High' },
  { zone: 'Koramangala', lat: 12.9352, lng: 77.6245, events: 223, risk: 'High' },
  { zone: 'Indiranagar', lat: 12.9784, lng: 77.6408, events: 198, risk: 'Medium' },
  { zone: 'Hebbal', lat: 13.0358, lng: 77.5970, events: 167, risk: 'Medium' },
  { zone: 'MG Road', lat: 12.9756, lng: 77.6064, events: 145, risk: 'Medium' },
  { zone: 'Jayanagar', lat: 12.9308, lng: 77.5838, events: 112, risk: 'Low' },
  { zone: 'Yelahanka', lat: 13.1007, lng: 77.5963, events: 89, risk: 'Low' },
];

export const summaryStats = {
  totalEvents: 2176,
  avgDelay: 28.4,
  highRiskEvents: 920,
  highRiskPct: 42.3,
};

export const monthlyTrend = [
  { month: 'Jan', high: 72, medium: 62, low: 38 },
  { month: 'Feb', high: 65, medium: 55, low: 42 },
  { month: 'Mar', high: 85, medium: 70, low: 48 },
  { month: 'Apr', high: 92, medium: 78, low: 52 },
  { month: 'May', high: 88, medium: 75, low: 50 },
  { month: 'Jun', high: 95, medium: 82, low: 55 },
  { month: 'Jul', high: 102, medium: 88, low: 58 },
  { month: 'Aug', high: 98, medium: 85, low: 54 },
  { month: 'Sep', high: 82, medium: 70, low: 45 },
  { month: 'Oct', high: 78, medium: 68, low: 42 },
  { month: 'Nov', high: 72, medium: 62, low: 38 },
  { month: 'Dec', high: 91, medium: 76, low: 50 },
];

export const zoneOptions = [
  'Silk Board',
  'Whitefield',
  'Marathahalli',
  'Electronic City',
  'Koramangala',
  'Indiranagar',
  'Hebbal',
  'MG Road',
  'Jayanagar',
  'Yelahanka',
];
