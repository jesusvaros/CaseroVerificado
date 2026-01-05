type EventData = Record<string, unknown>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: EventData) => void;
      identify: (userId: string) => void;
    };
    posthog?: any;
  }
}

// Umami tracking functions
export function trackUmamiEvent(event: string, data?: EventData) {
  if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
    window.umami.track(event, data);
  }
}

export function umamiEventProps(event: string, data?: EventData) {
  const props: Record<string, string> = {
    'data-umami-event': event,
  };
  if (data && Object.keys(data).length > 0) {
    props['data-umami-event-data'] = JSON.stringify(data);
  }
  return props;
}

// PostHog tracking functions
export function trackPostHogEvent(event: string, data?: EventData) {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.capture === 'function') {
    window.posthog.capture(event, data);
  }
}

// Combined tracking function - tracks to both systems
export function trackEvent(event: string, data?: EventData) {
  trackUmamiEvent(event, data);
  trackPostHogEvent(event, data);
}

// User identification for both systems
export function identifyUser(userId: string) {
  if (typeof window !== 'undefined' && window.umami && typeof window.umami.identify === 'function') {
    window.umami.identify(userId);
  }
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.identify === 'function') {
    window.posthog.identify(userId);
  }
}

// Reset user identification (PostHog only)
export function resetUser() {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.reset === 'function') {
    window.posthog.reset();
  }
}

export {};
