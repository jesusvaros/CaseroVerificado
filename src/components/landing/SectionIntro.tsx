import type { ReactNode } from 'react';

// Eyebrow, big title and lead paragraph shared by the home sections.
const SectionIntro = ({ eyebrow, eyebrowColor, title, children }: { eyebrow?: string; eyebrowColor?: string; title: string; children: ReactNode }) => (
  <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[18px]">
    {eyebrow && (
      <span className="text-sm font-bold uppercase tracking-[0.06em]" style={{ color: eyebrowColor ?? '#1F7A4D' }}>
        {eyebrow}
      </span>
    )}
    <h2 className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] md:text-[52px]">{title}</h2>
    <p className="max-w-[480px] text-lg leading-relaxed text-ink-soft">{children}</p>
  </div>
);

export default SectionIntro;
