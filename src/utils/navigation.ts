/**
 * Safe external navigation helper that creates a temporary anchor element
 * and triggers navigation, avoiding window.open which can be blocked in iframe sandboxes.
 */
export function safeOpenUrl(url: string, target: '_blank' | '_self' = '_blank'): void {
  if (typeof window === 'undefined') return;
  const link = document.createElement('a');
  link.href = url;
  if (target === '_blank') {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
