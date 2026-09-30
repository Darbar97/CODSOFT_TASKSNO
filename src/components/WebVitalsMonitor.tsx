import React, { useEffect } from 'react';
import { initWebVitals, type VitalsConfig } from '../utils/vitals';

export interface WebVitalsMonitorProps extends VitalsConfig {
  /** Optional custom callback whenever a metric is recorded */
  onMetricReported?: (metricName: string, value: number, rating: string) => void;
}

/**
 * Performance Monitoring Component for Core Web Vitals (LCP, INP, CLS).
 *
 * Uses the official 'web-vitals' library to capture:
 * - LCP (Largest Contentful Paint)
 * - INP (Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 *
 * Logs formatted status to the developer console during development,
 * registers metrics in `window.__CORE_WEB_VITALS__`, and dispatches
 * payloads to configured analytics endpoints via sendBeacon/fetch keepalive.
 */
export const WebVitalsMonitor: React.FC<WebVitalsMonitorProps> = ({
  analyticsEndpoint,
  logToConsole = true,
  reportAllChanges = false,
}) => {
  useEffect(() => {
    const cleanup = initWebVitals({
      analyticsEndpoint,
      logToConsole,
      reportAllChanges,
    });

    return () => {
      cleanup();
    };
  }, [analyticsEndpoint, logToConsole, reportAllChanges]);

  // Headless component - maintains clean UI without rendering telemetry logs to users
  return null;
};
