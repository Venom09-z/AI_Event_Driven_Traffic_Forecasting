import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface HotspotZone {
  zone: string;
  lat: number;
  lng: number;
  events: number;
  risk: string;
}

const RISK_COLORS: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#22c55e',
};

interface HotspotMapProps {
  zones: HotspotZone[];
}

export default function HotspotMap({ zones }: HotspotMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 11,
      zoomControl: false,
    });

    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Custom zoom control (top-right)
    L.control.zoom({ position: 'topright' }).addTo(map);

    const maxEvents = Math.max(...zones.map(z => z.events));

    zones.forEach((zone) => {
      const radius = Math.max(10, (zone.events / maxEvents) * 28);
      const color = RISK_COLORS[zone.risk] ?? '#3b82f6';

      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius,
        fillColor: color,
        fillOpacity: 0.78,
        color: '#ffffff',
        weight: 2.5,
      }).addTo(map);

      circle.bindPopup(`
        <div style="font-family:system-ui,sans-serif;padding:4px 2px;min-width:160px">
          <p style="font-weight:800;font-size:14px;color:#111827;margin:0 0 8px 0">${zone.zone}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
            <div style="background:#f9fafb;padding:6px 8px;border-radius:8px">
              <p style="font-size:9px;color:#9ca3af;margin:0 0 2px 0;font-weight:700;text-transform:uppercase;letter-spacing:.04em">Events</p>
              <p style="font-size:18px;font-weight:900;color:#111827;margin:0">${zone.events}</p>
            </div>
            <div style="background:${color}12;padding:6px 8px;border-radius:8px;border:1px solid ${color}28">
              <p style="font-size:9px;color:#9ca3af;margin:0 0 2px 0;font-weight:700;text-transform:uppercase;letter-spacing:.04em">Risk</p>
              <p style="font-size:14px;font-weight:800;color:${color};margin:0">${zone.risk}</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
            <p style="font-size:10px;color:#9ca3af;margin:0">Lat: <span style="color:#374151;font-weight:600;font-family:monospace">${zone.lat.toFixed(4)}</span></p>
            <p style="font-size:10px;color:#9ca3af;margin:0">Lng: <span style="color:#374151;font-weight:600;font-family:monospace">${zone.lng.toFixed(4)}</span></p>
          </div>
        </div>
      `, { maxWidth: 220 });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: 380, width: '100%', borderRadius: 12, overflow: 'hidden' }}
    />
  );
}
