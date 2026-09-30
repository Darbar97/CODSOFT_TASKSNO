import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

export interface VitalsReport {
  id: string;
  name: 'CLS' | 'INP' | 'LCP' | 'FCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType?: string;
  timestamp: number;
  formattedValue: string;
}

// Color palette for styled console logging
const RATING_COLORS = {
  good: '#10b981', // green
  'needs-improvement': '#f59e0b', // amber
  poor: '#ef4444', // red
};

/**
 * Format metric value into a readable string
 */
export function formatMetricValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value)} ms`;
}

/**
 * Logs a Web Vital metric to the developer console with color-coded rating
 */
export function logMetricToConsole(metric: Metric): void {
  const formattedValue = formatMetricValue(metric.name, metric.value);
  const color = RATING_COLORS[metric.rating] || '#6366f1';
  const badgeStyle = `background: ${color}; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-size: 11px;`;
  const labelStyle = 'color: #71717a; font-weight: 500; font-size: 11px;';
  const valueStyle = 'color: #09090b; font-weight: bold; font-size: 12px;';

  console.log(
    `%c[Web Vitals] %c${metric.name} %c${formattedValue} %c(${metric.rating})`,
    'color: #3b82f6; font-weight: bold;',
    labelStyle,
    valueStyle,
    badgeStyle,
    {
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
      entries: metric.entries,
    }
  );
}

/**
 * Reports a metric to an analytics endpoint via navigator.sendBeacon or fetch
 */
export function reportMetricToEndpoint(metric: Metric, endpoint?: string): void {
  const envEndpoint = (import.meta as unknown as { env?: Record<string, string | undefined> })?.env?.VITE_ANALYTICS_ENDPOINT;
  const targetUrl = endpoint || envEndpoint || '/api/vitals';

  const payload: VitalsReport = {
    id: metric.id,
    name: metric.name as VitalsReport['name'],
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    formattedValue: formatMetricValue(metric.name, metric.value),
  };

  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const beaconSent = navigator.sendBeacon(targetUrl, body);
      if (beaconSent) return;
    } catch {
      // Fall through to fetch
    }
  }

  if (typeof fetch === 'function') {
    fetch(targetUrl, {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {
      // Silently catch endpoint absence in development/static hosting
    });
  }
}

/**
 * Initializes Core Web Vitals monitoring:
 * Listens for LCP, INP, CLS, FCP, and TTFB.
 */
export function initWebVitals(
  onReport?: (report: VitalsReport) => void,
  options: {
    logToConsole?: boolean;
    reportToAnalytics?: boolean;
    analyticsEndpoint?: string;
  } = {}
): () => void {
  const {
    logToConsole = true,
    reportToAnalytics = false,
    analyticsEndpoint,
  } = options;

  const handleMetric = (metric: Metric) => {
    // 1. Console Logging in Dev Mode
    if (logToConsole) {
      logMetricToConsole(metric);
    }

    // 2. Report to Analytics Endpoint if enabled
    if (reportToAnalytics) {
      reportMetricToEndpoint(metric, analyticsEndpoint);
    }

    // 3. Callback for React state / UI monitoring
    if (onReport) {
      onReport({
        id: metric.id,
        name: metric.name as VitalsReport['name'],
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType,
        timestamp: Date.now(),
        formattedValue: formatMetricValue(metric.name, metric.value),
      });
    }
  };

  // Register Core Web Vitals listeners
  try {
    onLCP(handleMetric);
    onINP(handleMetric);
    onCLS(handleMetric);
    onFCP(handleMetric);
    onTTFB(handleMetric);
  } catch (err) {
    console.warn('[Web Vitals] Failed to register observers:', err);
  }

  // Cleanup handler (empty placeholder as web-vitals observers run lifecycle-long)
  return () => {};
}
