import { useRef, useState, type KeyboardEvent } from 'react';
import { Check, FileText } from 'lucide-react';
import { knowledgeSources, products, type ProductId } from '../data/content';

function Toggle() {
  return (
    <span className="relative h-[26px] w-11 shrink-0 rounded-full bg-brand" aria-hidden="true">
      <span className="absolute right-[3px] top-[3px] h-5 w-5 rounded-full bg-white" />
    </span>
  );
}

function ChatVisual() {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono text-xs text-ink-500">Widget appearance</span>
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-[1_1_140px] flex-col gap-1.5 rounded-[14px] border border-paper-400 bg-white p-4">
          <span className="text-xs text-ink-500">Brand color</span>
          <span className="flex gap-1.5">
            <span className="h-[22px] w-[22px] rounded-md bg-brand" />
            <span className="h-[22px] w-[22px] rounded-md bg-ink" />
            <span className="h-[22px] w-[22px] rounded-md bg-ok" />
          </span>
        </div>
        <div className="flex flex-[1_1_140px] flex-col gap-1.5 rounded-[14px] border border-paper-400 bg-white p-4">
          <span className="text-xs text-ink-500">Languages</span>
          <span className="font-semibold">Auto-detect</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 rounded-[14px] border border-paper-400 bg-white p-4">
        <span className="text-xs text-ink-500">When the bot isn't sure</span>
        <div className="flex items-center justify-between gap-3"><span className="font-medium">Hand off to a human in Slack or Zendesk</span><Toggle /></div>
        <div className="flex items-center justify-between gap-3"><span className="font-medium">Capture name &amp; email before handoff</span><Toggle /></div>
      </div>
    </div>
  );
}

function VoiceVisual() {
  const lines = [
    ['AGENT', 'Thanks for calling Northside Plumbing — how can I help?'],
    ['CALLER', 'My kitchen sink is leaking. Can someone come tomorrow?'],
    ['AGENT', 'I have a technician free tomorrow between 9 and 11. Shall I book it?'],
  ];
  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono text-xs text-ink-500">Call transcript · live</span>
      <div className="flex flex-col gap-3 rounded-2xl bg-ink p-5 text-sm text-white">
        {lines.map(([who, text], i) => (
          <div key={i} className="flex gap-2.5">
            <span className={`w-14 shrink-0 font-mono ${who === 'AGENT' ? 'text-brand-light' : 'text-ink-300'}`}>{who}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {['Calendar: slot held', 'CRM: lead created', 'Summary sent by SMS'].map((t) => (
          <span key={t} className="rounded-full border border-paper-400 bg-white px-3.5 py-2 text-[13px] font-medium">{t}</span>
        ))}
      </div>
    </div>
  );
}

function KbVisual() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-xs text-ink-500">Knowledge sources</span>
      {knowledgeSources.map((s) => (
        <div key={s.name} className="flex items-center gap-3.5 rounded-[14px] border border-paper-400 bg-white px-4 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-paper-200">
            <FileText size={18} className="text-ink-700" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-grow flex-col">
            <span className="text-[15px] font-semibold">{s.name}</span>
            <span className="text-[13px] text-ink-500">{s.meta}</span>
          </div>
          <span className="rounded-full bg-ok-tint px-2.5 py-1 text-xs font-semibold text-ok-dark">Synced</span>
        </div>
      ))}
    </div>
  );
}

const visuals: Record<ProductId, () => JSX.Element> = { chat: ChatVisual, voice: VoiceVisual, kb: KbVisual };

export default function Products() {
  const [active, setActive] = useState<ProductId>('chat');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = products.find((x) => x.id === active)!;
  const Visual = visuals[active];

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = products.findIndex((x) => x.id === active);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % products.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + products.length) % products.length;
    else return;
    e.preventDefault();
    setActive(products[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="products" className="container-site flex flex-col gap-12 pb-24 pt-20 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="eyebrow text-brand-dark">Products</span>
          <h2 className="h2">Three products. One brain behind them.</h2>
        </div>
        <p className="max-w-[420px] text-ink-600">
          Every agent reads from the same knowledge base, so your chat widget and your phone line always give the same, up-to-date answer.
        </p>
      </div>

      <div role="tablist" aria-label="Products" onKeyDown={onKeyDown} className="flex flex-wrap gap-2 self-start rounded-full bg-paper-300 p-1.5">
        {products.map((x, i) => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={on}
              aria-controls={`panel-${x.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(x.id)}
              className={`min-h-11 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${on ? 'bg-ink text-white' : 'text-ink-700 hover:text-ink'}`}
            >
              {x.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="flex flex-wrap gap-10 rounded-[28px] border border-paper-400 bg-white p-6 md:p-12"
      >
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <span className="eyebrow text-ink-500">{p.kicker}</span>
          <h3 className="font-display text-[28px] font-semibold leading-[34px] tracking-[-0.02em] md:text-[34px] md:leading-10">{p.headline}</h3>
          <p className="text-[17px] text-ink-600">{p.description}</p>
          <ul className="flex flex-col gap-3">
            {p.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-tint">
                  <Check size={12} strokeWidth={3} className="text-brand-dark" aria-hidden="true" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-3">
            <a href="#pricing" className="btn-dark">Try {p.name} free</a>
            <a href="#contact" className="px-2 py-3.5 font-semibold underline">Talk to sales</a>
          </div>
        </div>
        <div className="flex min-h-[380px] min-w-0 flex-[1_1_420px] flex-col justify-center rounded-[20px] bg-paper-200 p-5 md:p-7">
          <Visual />
        </div>
      </div>
    </section>
  );
}
