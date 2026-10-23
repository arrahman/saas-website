import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('Turnstile failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  onLoadError?: () => void;
};

/** Cloudflare Turnstile bot check. Remount it (change its `key`) to get a fresh token. */
export default function Turnstile({ siteKey, onToken, onLoadError }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef({ onToken, onLoadError });
  cb.current = { onToken, onLoadError };

  useEffect(() => {
    let id: string | undefined;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        id = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (t: string) => cb.current.onToken(t),
          'expired-callback': () => cb.current.onToken(''),
          'error-callback': () => cb.current.onToken(''),
        });
      })
      .catch(() => cb.current.onLoadError?.());
    return () => {
      cancelled = true;
      if (id) window.turnstile?.remove(id);
    };
  }, [siteKey]);

  return <div ref={ref} className="min-h-[65px]" />;
}
