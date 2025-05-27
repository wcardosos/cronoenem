export function trackEventWhenReady(eventName: string, attempts = 10) {
  const interval = setInterval(() => {
    if ((window as any).umami) {
      (window as any).umami.track(eventName);
      clearInterval(interval);
    }

    if (--attempts <= 0) clearInterval(interval);
  }, 300);
}
