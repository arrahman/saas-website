import { segments, useCases } from '../data/content';

export default function Solutions() {
  return (
    <section id="solutions" className="container-site flex flex-col gap-12 pb-24 pt-20 md:pt-28">
      <div className="flex max-w-[720px] flex-col gap-4">
        <span className="eyebrow text-brand-dark">Solutions</span>
        <h2 className="h2">Sized for a one-person shop or a global enterprise.</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {segments.map((s) => (
          <article key={s.tag} className="flex flex-col gap-[18px] rounded-3xl border border-paper-400 bg-white p-8">
            <span className="eyebrow text-ink-500">{s.tag}</span>
            <h3 className="font-display text-[26px] font-semibold leading-8">{s.title}</h3>
            <p className="text-ink-600">{s.body}</p>
            <ul className="flex flex-col gap-2 border-t border-paper-300 pt-[18px]">
              {s.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-[15px]">
                  <span className="font-bold text-brand-dark" aria-hidden="true">→</span>{pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold">Popular use cases</h3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
          {useCases.map((u) => (
            <li key={u.t} className="flex flex-col gap-1 rounded-2xl border border-paper-400 bg-white px-5 py-[18px]">
              <span className="font-semibold">{u.t}</span>
              <span className="text-sm text-ink-500">{u.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
