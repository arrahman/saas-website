export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] ${light ? 'bg-white/10' : 'bg-ink'}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9DB1FF" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
        </svg>
      </span>
      <span className={`font-display text-[22px] font-bold tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>voxa</span>
    </span>
  );
}
