import { useState } from 'react';
import { faqs } from '../data/content';

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="container-site flex flex-wrap gap-14 py-20 md:py-28">
      <div className="flex flex-[1_1_320px] flex-col gap-4">
        <span className="eyebrow text-brand-dark">FAQ</span>
        <h2 className="h2">Questions, answered.</h2>
        <p className="text-ink-600">
          Can't find what you need? <a href="#contact" className="text-brand-dark underline hover:text-ink">Talk to our team</a>.
        </p>
      </div>
      <div className="flex min-w-0 flex-[2_1_520px] flex-col">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-paper-400">
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 py-[22px] text-left text-lg font-semibold"
                >
                  <span>{f.q}</span>
                  <span className="shrink-0 font-mono text-[22px] text-brand-dark" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </h3>
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                <p className="pb-6 pr-10 text-ink-600">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
