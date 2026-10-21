import { useState, type FormEvent } from 'react';
import { Check, HelpCircle, Mail, MapPin } from 'lucide-react';
import { brand } from '../data/content';

const interestOptions = [
  { id: 'chat', label: 'Chat Agent' },
  { id: 'voice', label: 'Voice Agent' },
  { id: 'kb', label: 'Knowledge Base' },
] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Set VITE_CONTACT_ENDPOINT in .env to a form backend (e.g. Formspree, Basin, or your own API).
// Without it the form shows the success state locally so the UI can be reviewed.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export default function Contact() {
  const [interests, setInterests] = useState<string[]>(['chat']);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const toggle = (id: string) =>
    setInterests((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, interests };

    if (!ENDPOINT) {
      setStatus('sent');
      return;
    }
    try {
      setStatus('sending');
      setError('');
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError('Your request wasn’t sent. Check your connection and try again, or email us directly.');
    }
  }

  const contactRows = [
    { icon: Mail, label: 'Sales', value: brand.salesEmail, href: `mailto:${brand.salesEmail}` },
    { icon: HelpCircle, label: 'Support', value: brand.supportEmail, href: `mailto:${brand.supportEmail}` },
    { icon: MapPin, label: 'Office', value: brand.address },
  ];

  return (
    <section id="contact" className="bg-ink text-white">
      <div className="container-site flex flex-wrap gap-14 py-20 md:py-[104px]">
        <div className="flex flex-[1_1_380px] flex-col gap-6">
          <span className="eyebrow text-brand-light">Contact</span>
          <h2 className="h2">Let's build your first agent together.</h2>
          <p className="text-[17px] text-ink-300">
            Tell us about your business and we'll set up a tailored demo trained on your own content — usually within one business day.
          </p>
          <ul className="mt-2 flex flex-col gap-4">
            {contactRows.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700">
                  <Icon size={18} className="text-[#E4E7EC]" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] text-ink-300">{label}</span>
                  {href ? <a href={href} className="font-medium text-white underline-offset-4 hover:underline">{value}</a> : <span className="font-medium">{value}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-[1_1_460px] rounded-3xl bg-white p-6 text-ink md:p-9">
          {status === 'sent' ? (
            <div className="flex flex-col items-start gap-4 py-6" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ok-tint">
                <Check size={26} strokeWidth={2.6} className="text-ok-dark" aria-hidden="true" />
              </span>
              <h3 className="font-display text-[28px] font-semibold">Thanks — we'll be in touch.</h3>
              <p className="text-ink-600">A product specialist will reply within one business day with a demo agent trained on your website.</p>
              <button type="button" onClick={() => setStatus('idle')} className="btn-outline px-5 py-3">Send another request</button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold">Full name</label>
                  <input id="name" name="name" required autoComplete="name" placeholder="Jane Cooper" className="field" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold">Work email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className="field" />
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-semibold">Company</label>
                  <input id="company" name="company" autoComplete="organization" placeholder="Acme Inc." className="field" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="size" className="text-sm font-semibold">Team size</label>
                  <select id="size" name="teamSize" className="field min-h-12">
                    <option>Just me</option><option>2–10</option><option>11–50</option><option>51–500</option><option>500+</option>
                  </select>
                </div>
              </div>
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold">I'm interested in</legend>
                <div className="flex flex-wrap gap-2.5">
                  {interestOptions.map((o) => {
                    const on = interests.includes(o.id);
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(o.id)}
                        className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-paper-500 bg-white text-ink-700 hover:border-ink'}`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold">What should your agent do?</label>
                <textarea id="message" name="message" rows={4} placeholder="e.g. Answer product questions on our Shopify store and book installation calls." className="field resize-y" />
              </div>
              {status === 'error' && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="btn-primary min-h-[52px] disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Request a demo'}
              </button>
              <span className="text-[13px] text-ink-500">
                By submitting you agree to our <a href="#" className="text-brand-dark underline">privacy policy</a>. We never share your data.
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
