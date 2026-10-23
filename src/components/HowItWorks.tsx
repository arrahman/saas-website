import { brand, steps } from '../data/content';

export default function HowItWorks() {
  return (
    <section className="bg-ink text-white">
      <div className="container-site flex flex-col gap-14 py-20 md:py-[104px]">
        <div className="flex max-w-[680px] flex-col gap-4">
          <span className="eyebrow text-brand-light">How it works</span>
          <h2 className="h2">From your documents to a live agent in three steps.</h2>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-4 rounded-[20px] border border-ink-700 bg-ink-800 p-8">
              <span className="font-mono text-sm text-brand-light" aria-hidden="true">{s.n}</span>
              <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
              <p className="text-ink-300">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-8 border-t border-ink-700 pt-10">
          <div className="flex flex-[1_1_320px] flex-col gap-2.5">
            <h3 className="font-display text-2xl font-semibold">One line of code. Any platform.</h3>
            <p className="text-ink-300">
              Paste the snippet into any site, or use our native plugins, SDKs and REST API. Voice agents get a phone number or plug into your existing telephony.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_520px] overflow-x-auto rounded-2xl border border-ink-700 bg-ink-800 px-6 py-5">
            <pre className="font-mono text-sm leading-6 text-[#E4E7EC]">
              <code>
                <span className="text-[#8A93A3]">{'<!-- Knowex AI widget -->'}</span>{'\n'}
                {`<script src="${brand.widgetSnippet.src}"\n  data-agent="`}
                <span className="text-brand-light">{brand.widgetSnippet.agentId}</span>
                {`"\n  data-voice="true" async></script>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
