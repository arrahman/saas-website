import { useState } from 'react';
import { Check } from 'lucide-react';
import { plans } from '../data/content';

type Billing = 'monthly' | 'yearly';

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('yearly');
  const yearly = billing === 'yearly';

  const pill = (on: boolean) =>
    `min-h-11 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${on ? 'bg-ink text-white' : 'text-ink-700 hover:text-ink'}`;

  return (
    <section id="pricing" className="border-y border-paper-400 bg-white">
      <div className="container-site flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow text-brand-dark">Pricing</span>
          <h2 className="h2 max-w-[720px]">Simple subscriptions that grow with you.</h2>
          <p className="max-w-[560px] text-ink-600">
            Every plan includes the knowledge base, the chat widget and a 14-day free trial. Add voice when you're ready.
          </p>
          <div role="group" aria-label="Billing period" className="mt-2 flex gap-1 rounded-full bg-paper-300 p-[5px]">
            <button type="button" aria-pressed={!yearly} onClick={() => setBilling('monthly')} className={pill(!yearly)}>Monthly</button>
            <button type="button" aria-pressed={yearly} onClick={() => setBilling('yearly')} className={pill(yearly)}>Yearly · save 20%</button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-stretch gap-4">
          {plans.map((pl) => {
            const dark = !!pl.popular;
            const custom = pl.monthly === null;
            const price = custom ? 'Custom' : `$${yearly ? pl.yearly : pl.monthly}`;
            const note = custom ? 'Tailored to your volume' : yearly ? `Billed $${(pl.yearly ?? 0) * 12} yearly` : 'Billed monthly';
            const sub = dark ? 'text-ink-300' : 'text-ink-500';
            return (
              <article
                key={pl.name}
                className={`flex flex-col gap-3.5 rounded-3xl p-7 ${dark ? 'border border-ink bg-ink text-white shadow-[0_30px_60px_-30px_rgba(14,17,22,0.5)]' : 'border border-paper-400 bg-paper'}`}
              >
                <div className="flex min-h-7 items-center justify-between gap-2">
                  <h3 className="font-display text-[22px] font-semibold">{pl.name}</h3>
                  {pl.popular && <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-white">Most popular</span>}
                </div>
                <span className={`text-sm ${sub}`}>{pl.audience}</span>
                <div className="flex min-h-[60px] items-baseline gap-1.5">
                  <span className="font-display text-5xl font-semibold tracking-[-0.03em]">{price}</span>
                  {!custom && <span className={`text-sm ${sub}`}>/ month</span>}
                </div>
                <span className={`-mt-2 text-[13px] ${sub}`}>{note}</span>
                <a href={pl.ctaHref} className={`mb-2.5 mt-1.5 block rounded-full px-[18px] py-3.5 text-center font-semibold ${dark ? 'bg-brand text-white hover:bg-brand-dark' : 'border border-paper-500 bg-white text-ink hover:border-ink'}`}>
                  {pl.cta}
                </a>
                <ul className="flex flex-col gap-2.5 text-[15px]">
                  {pl.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={16} strokeWidth={2.6} className={`mt-1 shrink-0 ${dark ? 'text-brand-light' : 'text-brand-dark'}`} aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="text-center text-sm text-ink-500">
          Prices in USD, excluding taxes. Extra messages and voice minutes are billed at usage rates; you can set a monthly cap.
        </p>
      </div>
    </section>
  );
}
