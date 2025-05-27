export function trackEventWhenReady(eventName: string, attempts = 10) {
  const interval = setInterval(() => {
    if ((window as any).umami) {
      (window as any).umami.track(eventName);
      clearInterval(interval);
      console.log('chamou umami')
    }

    if (--attempts <= 0) clearInterval(interval);
  }, 300); // tenta a cada 300ms até 10 vezes
}
