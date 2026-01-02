type EventData = Record<string, unknown>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: EventData) => void;
      identify: (userId: string) => void;
    };
  }
}

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

export {};
