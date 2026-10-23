import { brand } from '../data/content';
import { ArrowRight, Check, FileText, Phone, Send } from 'lucide-react';

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
          <div className="overflow-hidden rounded-[20px] border border-paper-400 bg-white shadow-[0_30px_60px_-30px_rgba(14,17,22,0.25)]">
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display font-bold">M</span>
              <div className="flex flex-grow flex-col">
                <span className="text-[15px] font-semibold">Maple Dental · Assistant</span>
                <span className="flex items-center gap-1.5 text-xs text-ink-300">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> Online — replies instantly
                </span>
              </div>
              <span className="rounded-md border border-ink-700 px-2 py-0.5 font-mono text-[11px] text-ink-300">CHAT</span>
            </div>
            <div className="flex flex-col gap-3 bg-[#FAFAF8] p-5">
              <div className="max-w-[78%] self-end rounded-[16px_16px_4px_16px] bg-ink px-3.5 py-2.5 text-sm text-white">
                Do you take new patients on Saturdays?
              </div>
              <div className="flex max-w-[84%] flex-col gap-2 self-start rounded-[16px_16px_16px_4px] border border-paper-400 bg-white px-3.5 py-3 text-sm">
                <span>Yes — we're open Saturdays 9am–2pm and welcome new patients. The next opening is this Saturday at 10:30.</span>
                <span className="flex items-center gap-1.5 text-xs text-ink-500">
                  <FileText size={13} aria-hidden="true" /> Source: Clinic hours &amp; policies.pdf
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="min-h-9 rounded-full border border-brand/35 bg-brand-tint px-3.5 py-2 text-[13px] font-medium text-brand-dark">
                  Book Saturday 10:30
                </button>
                <button type="button" className="min-h-9 rounded-full border border-paper-500 bg-white px-3.5 py-2 text-[13px] font-medium text-ink-700">
                  Other times
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2.5 border-t border-paper-400 px-4 py-3">
              <label htmlFor="hero-msg" className="sr-only">Message</label>
              <input id="hero-msg" type="text" placeholder="Type your message…" className="min-w-0 flex-grow rounded-full border border-paper-400 bg-[#FAFAF8] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              <button type="button" aria-label="Send message" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

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
