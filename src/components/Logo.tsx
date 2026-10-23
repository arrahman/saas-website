import { brand } from '../data/content';

export default function Logo({ light = false, showTagline = false }: { light?: boolean; showTagline?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] ${light ? 'bg-white/10' : 'bg-ink'}`}>
        {/* Two-way arrows: knowledge flowing in and out */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9DB1FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[22px] font-bold tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>
          knowex<span className={light ? 'text-brand-light' : 'text-brand'}>.ai</span>
        </span>
        {showTagline && (
          <span className={`mt-1 text-[11px] font-medium tracking-[0.02em] ${light ? 'text-ink-300' : 'text-ink-600'}`}>{brand.tagline}</span>
        )}
      </span>
    </span>
  );
}
