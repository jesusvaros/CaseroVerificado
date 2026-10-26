// Underlined inputs from the redesign: no box, a single bottom rule that turns coral on error.
export const underlineInput = (hasError: boolean) =>
  `w-full border-0 border-b-[1.5px] bg-transparent px-0 py-2.5 text-ink placeholder:text-[#8A9384] focus:border-brand focus:outline-none focus:ring-0 ${
    hasError ? 'border-coral' : 'border-[#C9D2BC]'
  }`;

export const smallLabel = 'text-sm font-semibold text-ink-muted';

export const sectionTitle = 'font-display text-2xl font-extrabold tracking-tight md:text-[26px]';
