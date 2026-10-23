import Logo from './Logo';
import { brand } from '../data/content';

const columns = [
  { title: 'Products', links: [['Chat Agent', '#products'], ['Voice Agent', '#products'], ['Knowledge Base', '#products']] },
  { title: 'Solutions', links: [['Individuals', '#solutions'], ['Small business', '#solutions'], ['Enterprise', '#solutions']] },
  { title: 'Company', links: [['Pricing', '#pricing'], ['Contact', '#contact'], ['Security', '#contact']] },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink text-ink-300">
      <div className="container-site flex flex-col gap-10 pb-10 pt-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-[1_1_260px] flex-col gap-3">
            <Logo light showTagline />
            <p className="text-sm">AI chat, voice agents and knowledge base for businesses of every size.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-14 text-sm">
            {columns.map((c) => (
              <div key={c.title} className="flex flex-col gap-2.5">
                <span className="font-semibold text-white">{c.title}</span>
                {c.links.map(([label, href]) => (
                  <a key={label} href={href} className="hover:text-white">{label}</a>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink-700 pt-6 text-[13px]">
          <span>© {new Date().getFullYear()} {brand.name} · {brand.domain}. All rights reserved.</span>
          <span className="flex gap-5">
            <a href="#" className="underline hover:text-white">Privacy</a>
            <a href="#" className="underline hover:text-white">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
