import { useState } from 'react';
import { Radio, AlertTriangle, Satellite } from 'lucide-react';
import { calculateTrilateration } from '../lib/trilateration.js';

// Demo/dev-only packet generator — there's no live LoRa mesh wired up
// to this web dashboard yet, so this simulates what an incoming
// emergency packet from three nodes would look like. Clearly labeled
// in the UI as simulated, never presented as a real signal.
function samplePacket(seq) {
  const jitter = () => (Math.random() - 0.5) * 6;
  return {
    node_id: `MS_NODE_${String(49 + seq).padStart(3, '0')}A`,
    status: 'EMERGENCY',
    node1_metrics: { x: 0, y: 0, r: 12 + jitter() },
    node2_metrics: { x: 18, y: 4, r: 14 + jitter() },
    node3_metrics: { x: 6, y: 20, r: 10 + jitter() },
  };
}

export default function EmergencyDashboard() {
  const [activeAlerts, setActiveAlerts] = useState([]);

  function handleIncomingNetworkPacket(packetData) {
    if (packetData.status !== 'EMERGENCY') return;
    const location = calculateTrilateration(
      packetData.node1_metrics,
      packetData.node2_metrics,
      packetData.node3_metrics
    );
    if (!location) return; // degenerate node geometry — nothing to plot
    setActiveAlerts((prev) => [{ id: packetData.node_id, coordinates: location, timestamp: new Date() }, ...prev]);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Radio className="h-4 w-4 text-raptor-cyan" />
        <h2 className="text-base font-semibold text-slate-100">Community Mesh Security Center</h2>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-lg border border-raptor-line bg-raptor-bg/40 px-3 py-2 text-xs text-slate-500">
        <Satellite className="h-3.5 w-3.5 shrink-0" /> No live mesh connected — this view is showing simulated packets for demo purposes only.
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raptor-cyan">Live</span>
            <h3 className="mt-1 text-base font-semibold text-slate-100">Active system threats</h3>
          </div>
          <button
            onClick={() => handleIncomingNetworkPacket(samplePacket(activeAlerts.length))}
            className="rounded-lg border border-raptor-line px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-raptor-cyan/50 hover:text-raptor-cyan"
          >
            Simulate incoming packet
          </button>
        </div>

        {activeAlerts.length === 0 ? (
          <p className="text-sm text-slate-500">Monitoring airwaves… network status clear.</p>
        ) : (
          <ul className="space-y-2">
            {activeAlerts.map((alert, index) => (
              <li key={index} className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <div>
                  <div className="font-medium text-rose-300">{alert.id}</div>
                  <div className="mt-0.5 font-mono text-xs text-rose-400/80">
                    Trilaterated fix: X {alert.coordinates.x}, Y {alert.coordinates.y}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{alert.timestamp.toLocaleTimeString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
