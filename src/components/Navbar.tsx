import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-400 bg-paper/90 backdrop-blur-md">
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="Knowex AI home"><Logo /></a>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-700 hover:text-ink">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden px-3 py-2.5 text-[15px] font-medium md:inline">Sign in</a>
          <a href="#pricing" className="btn-dark px-[18px] py-3 text-[15px]">Start free trial</a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-paper-400 bg-paper md:hidden">
          <div className="container-site flex flex-col py-3">
            {[...navLinks, { label: 'Sign in', href: '#contact' }].map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
