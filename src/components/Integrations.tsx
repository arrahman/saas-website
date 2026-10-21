import { platforms } from '../data/content';

export default function Integrations() {
  return (
    <section id="integrations" className="border-y border-paper-400 bg-white">
      <div className="container-site flex flex-wrap items-center gap-x-10 gap-y-4 py-7">
        <h2 className="eyebrow text-ink-500">Plugs into the tools you already use</h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 font-display text-lg font-semibold text-ink-700">
          {platforms.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </section>
  );
}
