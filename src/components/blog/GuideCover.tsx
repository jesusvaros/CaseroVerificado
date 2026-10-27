import { guideTopic, type CoverTone } from './guideTopics';

const TONES: Record<CoverTone, { bg: string; halo: string; icon: string; label: string }> = {
  forest: { bg: 'bg-forest', halo: 'bg-brand', icon: 'text-lime', label: 'bg-lime text-forest' },
  lime: { bg: 'bg-lime', halo: 'bg-white', icon: 'text-forest', label: 'bg-forest text-lime' },
  mist: { bg: 'bg-mist', halo: 'bg-lime-soft', icon: 'text-brand', label: 'bg-white text-forest' },
  coral: { bg: 'bg-coral-soft', halo: 'bg-white', icon: 'text-coral', label: 'bg-white text-coral-ink' },
};

// Drawn cover for a guide: its topic icon over two soft rings, in one of the brand tones.
// onDark swaps the forest tone for lime so the cover stands out on the forest page header.
const GuideCover = ({ slug, size = 'card', onDark = false, className = '' }: { slug: string; size?: 'card' | 'hero' | 'thumb'; onDark?: boolean; className?: string }) => {
  const { label, Icon, tone } = guideTopic(slug);
  const t = TONES[onDark && tone === 'forest' ? 'lime' : tone];
  const iconSize = size === 'hero' ? 'h-24 w-24 md:h-28 md:w-28' : size === 'thumb' ? 'h-9 w-9' : 'h-16 w-16';

  return (
    <div className={`relative isolate flex items-center justify-center overflow-hidden ${t.bg} ${className}`} aria-hidden="true">
      <span className={`absolute -right-[12%] -top-[30%] -z-10 aspect-square w-[62%] rounded-full opacity-40 ${t.halo}`} />
      <span className={`absolute -bottom-[38%] -left-[10%] -z-10 aspect-square w-[55%] rounded-full opacity-25 ${t.halo}`} />
      <Icon className={`${iconSize} ${t.icon}`} strokeWidth={1.4} />
      {size !== 'thumb' && (
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${t.label}`}>{label}</span>
      )}
    </div>
  );
};

export default GuideCover;
