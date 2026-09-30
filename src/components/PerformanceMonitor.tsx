import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, X, Sparkles } from 'lucide-react';
import { initWebVitals, type VitalsReport } from '../utils/vitals';

interface PerformanceMonitorProps {
  logToConsole?: boolean;
  reportToAnalytics?: boolean;
  analyticsEndpoint?: string;
  enableDevWidget?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  logToConsole = true,
  reportToAnalytics = true,
  analyticsEndpoint,
  enableDevWidget = true,
}) => {
  const [metrics, setMetrics] = useState<Record<string, VitalsReport>>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cleanup = initWebVitals(
      (report) => {
        setMetrics((prev) => ({
          ...prev,
          [report.name]: report,
        }));
      },
      {
        logToConsole,
        reportToAnalytics,
        analyticsEndpoint,
      }
    );

    return () => {
      cleanup();
    };
  }, [logToConsole, reportToAnalytics, analyticsEndpoint]);

  if (!enableDevWidget || !isVisible) {
    return null;
  }

  const cwvList: Array<{ name: 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB'; label: string; threshold: string }> = [
    { name: 'LCP', label: 'Largest Contentful Paint', threshold: '≤ 2.5s' },
    { name: 'INP', label: 'Interaction to Next Paint', threshold: '≤ 200ms' },
    { name: 'CLS', label: 'Cumulative Layout Shift', threshold: '≤ 0.1' },
    { name: 'FCP', label: 'First Contentful Paint', threshold: '≤ 1.8s' },
    { name: 'TTFB', label: 'Time to First Byte', threshold: '≤ 0.8s' },
  ];

  const getRatingBadge = (rating?: VitalsReport['rating']) => {
    switch (rating) {
      case 'good':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          icon: <CheckCircle className="w-3 h-3 text-emerald-500" />,
          label: 'Good',
        };
      case 'needs-improvement':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          icon: <AlertTriangle className="w-3 h-3 text-amber-500" />,
          label: 'Needs Work',
        };
      case 'poor':
        return {
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          icon: <AlertCircle className="w-3 h-3 text-rose-500" />,
          label: 'Poor',
        };
      default:
        return {
          bg: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
          icon: <Activity className="w-3 h-3 text-zinc-400 animate-pulse" />,
          label: 'Measuring...',
        };
    }
  };

  // Overall health assessment
  const measuredVitals: VitalsReport[] = Object.values(metrics);
  const allGood = measuredVitals.length > 0 && measuredVitals.every((m) => m.rating === 'good');

  return (
    <aside
      id="core-web-vitals-monitor"
      aria-label="Core Web Vitals Live Performance Monitor"
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-40 print:hidden font-sans pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg transition-all duration-200 overflow-hidden text-zinc-900 dark:text-zinc-100 w-full sm:w-auto max-w-full sm:max-w-sm">
        
        {/* Minimized Bar */}
        <div className="flex items-center justify-between p-2.5 sm:px-3 gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
            title="Click to view live Web Vitals telemetry"
          >
            <div className={`p-1 rounded-md ${allGood ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}`}>
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold leading-none">Core Web Vitals</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                  Live
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {measuredVitals.length > 0 
                  ? `${measuredVitals.length} metrics captured`
                  : 'Listening for metrics...'}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded cursor-pointer transition-colors"
              aria-label={isExpanded ? 'Collapse Web Vitals HUD' : 'Expand Web Vitals HUD'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded cursor-pointer transition-colors"
              aria-label="Dismiss Web Vitals Monitor"
              title="Dismiss for this session"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded Telemetry Drawer */}
        {isExpanded && (
          <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800 space-y-2.5 bg-zinc-50/50 dark:bg-zinc-950/40">
            <div className="space-y-1.5">
              {cwvList.map((item) => {
                const metric = metrics[item.name];
                const badge = getRatingBadge(metric?.rating);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                        <span className="text-[10px] text-zinc-400">{item.threshold}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 block leading-tight">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                        {metric ? metric.formattedValue : '—'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${badge.bg}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Console logging active</span>
              </span>
              <span>Endpoint: {analyticsEndpoint || '/api/vitals'}</span>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
