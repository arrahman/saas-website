import { brand } from '../data/content';
import { ArrowRight, Check, Phone } from 'lucide-react';
import ChatDemo from './ChatDemo';

const wave = [8, 14, 20, 12, 24, 16, 10, 22, 18, 9, 15, 24, 13, 7, 19, 23, 11, 17, 21, 9, 14, 24, 12, 18, 8, 16, 20, 10];

export default function Hero() {
  return (
    <section id="top" className="container-site py-16 md:pb-[72px] md:pt-[88px]">
      <div className="flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <span className="eyebrow self-start rounded-full border border-paper-500 bg-white px-3 py-1.5 text-ink-700">
            {brand.tagline}
          </span>
          <h1 className="font-display text-[44px] font-semibold leading-[48px] tracking-[-0.035em] md:text-[68px] md:leading-[70px]">
            AI agents that talk to your customers <span className="text-brand">the way you would.</span>
          </h1>
          <p className="max-w-[540px] text-[19px] leading-[30px] text-ink-600">
            Train a chatbot and a voice agent on your own knowledge, drop them onto any website, app or phone line, and let
            them answer, book and sell around the clock. Built for solo founders, growing teams and enterprises alike.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#pricing" className="btn-primary px-6 py-4">
              Start 14-day free trial <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-outline px-6 py-4">Book a demo</a>
          </div>
          <ul className="flex flex-wrap gap-5 text-sm text-ink-600">
            {['No credit card required', 'Live in under an hour', 'Cancel anytime'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check size={16} strokeWidth={2.4} className="text-ok" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product mock */}
        <div className="relative flex min-w-0 flex-[1_1_440px] flex-col gap-4" aria-label="Example of a Knowex AI chat and voice agent">
          <ChatDemo />

          <div className="flex w-[82%] items-center gap-4 self-end rounded-[20px] bg-ink px-5 py-[18px] text-white shadow-[0_24px_48px_-24px_rgba(14,17,22,0.45)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ok">
              <Phone size={20} aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-grow flex-col gap-1.5">
              <span className="text-sm font-semibold">Voice agent · incoming call</span>
              <div className="flex h-6 items-center gap-[3px] overflow-hidden" aria-hidden="true">
                {wave.map((h, i) => (
                  <span key={i} className="w-[3px] shrink-0 rounded-sm bg-brand-light" style={{ height: h }} />
                ))}
              </div>
            </div>
            <span className="font-mono text-[13px] text-ink-300">02:14</span>
          </div>
        </div>
      </div>
    </section>
  );
}
