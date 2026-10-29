import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarCheck, Check, FileText, Loader2, Mail, RotateCcw, Send } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Scripted conversation — edit this array to change the demo.       */
/* ------------------------------------------------------------------ */

type Step =
  | { kind: 'bot'; text: string; source?: string; typingMs?: number }
  | { kind: 'user'; text: string }
  | { kind: 'tool'; running: string; done: string; ms?: number }
  | { kind: 'slots'; prompt: string; options: string[]; pick: number }
  | { kind: 'booking' }
  | { kind: 'pause'; ms: number };

const SCRIPT: Step[] = [
  { kind: 'bot', text: 'Hi there 👋 I’m the Maple Dental assistant. How can I help you today?', typingMs: 900 },
  { kind: 'user', text: 'Do you take new patients on Saturdays? I need a cleaning.' },
  { kind: 'tool', running: 'Searching clinic knowledge…', done: 'Found in Clinic hours & policies.pdf', ms: 1100 },
  { kind: 'bot', text: 'Yes — we’re open Saturdays 9am–2pm and welcome new patients. A new-patient cleaning takes about 45 minutes.', source: 'Clinic hours & policies.pdf' },
  { kind: 'tool', running: 'Checking the calendar…', done: '3 openings this Saturday', ms: 1000 },
  { kind: 'slots', prompt: 'Here are the next openings — which works for you?', options: ['Sat 10:30', 'Sat 11:15', 'Sat 1:00'], pick: 0 },
  { kind: 'bot', text: 'Thanks, Priya! Shall I book a new-patient cleaning for Saturday at 10:30?' },
  { kind: 'user', text: 'Yes, please confirm.' },
  { kind: 'tool', running: 'Booking appointment…', done: 'Added to Google Calendar', ms: 1200 },
  { kind: 'booking' },
  { kind: 'bot', text: 'You’re all set! A confirmation and calendar invite are on their way to your email. See you Saturday 😊', typingMs: 800 },
  { kind: 'pause', ms: 8000 },
];

/* ------------------------------------------------------------------ */

type Msg =
  | { id: number; kind: 'bot'; text: string; source?: string }
  | { id: number; kind: 'user'; text: string }
  | { id: number; kind: 'tool'; text: string; done: boolean }
  | { id: number; kind: 'slots'; prompt: string; options: string[]; picked: number | null }
  | { id: number; kind: 'booking' };

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
type NewMsg = DistributiveOmit<Msg, 'id'>;

const TYPE_SPEED = 38; // ms per character the visitor "types"

function finalTranscript(): Msg[] {
  // Static end state shown when the visitor prefers reduced motion.
  let id = 0;
  const out: Msg[] = [];
  for (const s of SCRIPT) {
    if (s.kind === 'bot') out.push({ id: id++, kind: 'bot', text: s.text, source: s.source });
    if (s.kind === 'user') out.push({ id: id++, kind: 'user', text: s.text });
    if (s.kind === 'tool') out.push({ id: id++, kind: 'tool', text: s.done, done: true });
    if (s.kind === 'slots') {
      out.push({ id: id++, kind: 'slots', prompt: s.prompt, options: s.options, picked: s.pick });
      out.push({ id: id++, kind: 'user', text: `${s.options[s.pick]} works — I’m Priya Shah.` });
    }
    if (s.kind === 'booking') out.push({ id: id++, kind: 'booking' });
  }
  return out;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function ChatDemo() {
  const reduced = prefersReducedMotion();
  const [messages, setMessages] = useState<Msg[]>(() => (reduced ? finalTranscript() : []));
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const [sendPulse, setSendPulse] = useState(0);
  const [visible, setVisible] = useState(false);
  const [run, setRun] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Only play while the demo is on screen (saves CPU, and visitors see it from the start).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Keep the newest message in view (scrolls the chat box only, never the page).
  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTo({ top: b.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, typing, reduced]);

  // The script runner.
  useEffect(() => {
    if (reduced || !visible) return;
    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timers.push(window.setTimeout(() => (cancelled ? reject(new Error('cancelled')) : resolve()), ms));
      });
    let nextId = 0;
    const push = (m: NewMsg) => setMessages((cur) => [...cur, { ...m, id: nextId++ } as Msg]);
    const patchLast = (fn: (m: Msg) => Msg) =>
      setMessages((cur) => (cur.length ? [...cur.slice(0, -1), fn(cur[cur.length - 1])] : cur));

    const typeAndSend = async (text: string) => {
      await sleep(700);
      for (let i = 1; i <= text.length; i++) {
        setDraft(text.slice(0, i));
        await sleep(TYPE_SPEED);
      }
      await sleep(350);
      setSendPulse((n) => n + 1);
      setDraft('');
      push({ kind: 'user', text });
    };

    const botSays = async (text: string, source?: string, typingMs = 1300) => {
      await sleep(400);
      setTyping(true);
      await sleep(typingMs);
      setTyping(false);
      push({ kind: 'bot', text, source });
    };

    (async () => {
      setMessages([]);
      setDraft('');
      setTyping(false);
      await sleep(500);
      for (const s of SCRIPT) {
        if (s.kind === 'bot') await botSays(s.text, s.source, s.typingMs);
        else if (s.kind === 'user') await typeAndSend(s.text);
        else if (s.kind === 'tool') {
          await sleep(350);
          push({ kind: 'tool', text: s.running, done: false });
          await sleep(s.ms ?? 1000);
          patchLast((m) => (m.kind === 'tool' ? { ...m, text: s.done, done: true } : m));
        } else if (s.kind === 'slots') {
          await botSays(s.prompt, undefined, 900);
          patchLast((m) => (m.kind === 'bot' ? { id: m.id, kind: 'slots', prompt: m.text, options: s.options, picked: null } : m));
          await sleep(1400);
          patchLast((m) => (m.kind === 'slots' ? { ...m, picked: s.pick } : m));
          await sleep(500);
          push({ kind: 'user', text: `${s.options[s.pick]} works — I’m Priya Shah.` });
        } else if (s.kind === 'booking') {
          await sleep(300);
          push({ kind: 'booking' });
        } else if (s.kind === 'pause') await sleep(s.ms);
      }
      if (!cancelled) setRun((r) => r + 1); // loop
    })().catch(() => {});

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [visible, run, reduced]);

  const replay = useCallback(() => {
    setMessages([]);
    setRun((r) => r + 1);
  }, []);

  return (
    <div ref={rootRef} className="overflow-hidden rounded-[20px] border border-paper-400 bg-white shadow-[0_30px_60px_-30px_rgba(14,17,22,0.25)]">
      <p className="sr-only">
        Animated demo: a visitor asks Maple Dental’s assistant about Saturday appointments. The assistant answers from the
        clinic’s policies, checks the calendar, offers times, and books the chosen slot in Google Calendar.
      </p>

      {/* Header */}
      <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display font-bold" aria-hidden="true">M</span>
        <div className="flex flex-grow flex-col">
          <span className="text-[15px] font-semibold">Maple Dental · Assistant</span>
          <span className="flex items-center gap-1.5 text-xs text-ink-300">
            <span className="h-2 w-2 rounded-full bg-green-400" /> {typing ? 'Typing…' : 'Online — replies instantly'}
          </span>
        </div>
        <button
          type="button"
          onClick={replay}
          className="flex min-h-9 items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-300 hover:border-ink-300 hover:text-white"
          aria-label="Replay chat demo"
        >
          <RotateCcw size={12} aria-hidden="true" /> REPLAY
        </button>
      </div>

      {/* Conversation */}
      <div ref={bodyRef} aria-hidden="true" className="flex h-[400px] flex-col gap-3 overflow-y-auto bg-[#FAFAF8] p-5 [scrollbar-width:none] [&>*]:shrink-0">
        <div className="mt-auto" />
        {messages.map((m) => {
          if (m.kind === 'user')
            return (
              <div key={m.id} className="max-w-[80%] animate-msg-in self-end rounded-[16px_16px_4px_16px] bg-ink px-3.5 py-2.5 text-sm text-white">
                {m.text}
              </div>
            );
          if (m.kind === 'bot')
            return (
              <div key={m.id} className="flex max-w-[86%] animate-msg-in flex-col gap-2 self-start rounded-[16px_16px_16px_4px] border border-paper-400 bg-white px-3.5 py-3 text-sm">
                <span>{m.text}</span>
                {m.source && (
                  <span className="flex items-center gap-1.5 text-xs text-ink-500">
                    <FileText size={13} /> Source: {m.source}
                  </span>
                )}
              </div>
            );
          if (m.kind === 'tool')
            return (
              <div key={m.id} className="flex animate-msg-in items-center gap-2 self-start font-mono text-[11.5px] text-ink-500">
                {m.done ? <Check size={13} strokeWidth={3} className="text-ok" /> : <Loader2 size={13} className="animate-spin text-brand" />}
                <span className={m.done ? 'text-ink-600' : ''}>{m.text}</span>
              </div>
            );
          if (m.kind === 'slots')
            return (
              <div key={m.id} className="flex max-w-[92%] animate-msg-in flex-col gap-2.5 self-start">
                <div className="rounded-[16px_16px_16px_4px] border border-paper-400 bg-white px-3.5 py-3 text-sm">{m.prompt}</div>
                <div className="flex flex-wrap gap-2">
                  {m.options.map((o, i) => {
                    const on = m.picked === i;
                    const dim = m.picked !== null && !on;
                    return (
                      <span
                        key={o}
                        className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                          on ? 'animate-pop border-brand bg-brand text-white' : dim ? 'border-paper-400 bg-white text-ink-500 opacity-60' : 'border-brand/35 bg-brand-tint text-brand-dark'
                        }`}
                      >
                        {o}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          return (
            <div key={m.id} className="w-[88%] animate-msg-in self-start overflow-hidden rounded-2xl border border-ok/30 bg-white text-sm shadow-[0_12px_24px_-16px_rgba(14,17,22,0.35)]">
              <div className="flex items-center gap-2 bg-ok-tint px-4 py-2.5 font-semibold text-ok-dark">
                <CalendarCheck size={16} /> Appointment booked
              </div>
              <div className="flex gap-3.5 px-4 py-3">
                <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-paper-400 py-1">
                  <span className="text-[10px] font-semibold uppercase text-red-600">Sat</span>
                  <span className="font-display text-lg font-semibold leading-tight">10:30</span>
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-semibold">New-patient cleaning</span>
                  <span className="text-xs text-ink-500">10:30 – 11:15 · Maple Dental</span>
                  <span className="text-xs text-ink-500">Priya Shah</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-paper-300 px-4 py-2.5 text-xs text-ink-600">
                <span className="flex items-center gap-1.5"><Check size={12} strokeWidth={3} className="text-ok" /> Google Calendar</span>
                <span className="flex items-center gap-1.5"><Mail size={12} className="text-ok" /> Confirmation emailed</span>
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex animate-msg-in items-center gap-1 self-start rounded-[16px_16px_16px_4px] border border-paper-400 bg-white px-4 py-3.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-ink-500" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        )}
      </div>

      {/* Composer (driven by the script) */}
      <div className="flex items-center gap-2.5 border-t border-paper-400 px-4 py-3" aria-hidden="true">
        <div className="flex min-h-[42px] min-w-0 flex-grow items-center overflow-hidden whitespace-nowrap rounded-full border border-paper-400 bg-[#FAFAF8] px-4 text-sm">
          {draft ? (
            <span className="truncate">
              {draft}
              <span className="ml-px inline-block h-4 w-px translate-y-[3px] animate-pulse bg-ink" />
            </span>
          ) : (
            <span className="text-ink-500">Type your message…</span>
          )}
        </div>
        <span
          key={sendPulse}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors ${draft ? 'bg-brand' : 'bg-brand/70'} ${sendPulse ? 'animate-pop' : ''}`}
        >
          <Send size={18} />
        </span>
      </div>
    </div>
  );
}
