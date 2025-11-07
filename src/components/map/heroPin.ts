export function chatBubbleSVG({
  fill = '#22C55E', // green-500
  stroke = 'none',
  size = 34,
  includeCheck = true,
  checkStroke = '#FFFFFF',
}: {
  fill?: string;
  stroke?: string;
  size?: number;
  includeCheck?: boolean;
  checkStroke?: string;
} = {}) {
  const w = size;
  const h = size; // square viewBox 24 -> scale to size
  const check = includeCheck
    ? `<path d="M7.5 12.5l3.5 3.5 5.5-5.5" fill="none" stroke="${checkStroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`
    : '';
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}">
  <path fill-rule="evenodd" d="M2.25 12c0-4.97 4.694-9 10.5-9s10.5 4.03 10.5 9c0 2.485-1.23 4.735-3.25 6.388V21a.75.75 0 0 1-1.064.625L15 20.25a12.9 12.9 0 0 1-2.25.195c-5.806 0-10.5-4.03-10.5-9Z" clip-rule="evenodd"/>
  ${check}
</svg>`;
}

export function faceBubbleSVG({
  fill = '#22C55E',
  stroke = 'none',
  size = 34,
  face = 'happy',
}: {
  fill?: string;
  stroke?: string;
  size?: number;
  face?: 'sad' | 'neutral' | 'happy';
} = {}) {
  const w = size;
  const h = size;
  let mouth: string;
  if (face === 'sad') {
    mouth = '<path d="M8 14c1.5-1.5 4.5-1.5 6 0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />';
  } else if (face === 'neutral') {
    mouth = '<line x1="8" y1="13.5" x2="14" y2="13.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />';
  } else {
    mouth = '<path d="M8 13c1.5 1.5 4.5 1.5 6 0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />';
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}">
  <path fill-rule="evenodd" d="M2.25 12c0-4.97 4.694-9 10.5-9s10.5 4.03 10.5 9c0 2.485-1.23 4.735-3.25 6.388V21a.75.75 0 0 1-1.064.625L15 20.25a12.9 12.9 0 0 1-2.25.195c-5.806 0-10.5-4.03-10.5-9Z" clip-rule="evenodd"/>
  <circle cx="9.25" cy="9.75" r="1" fill="#FFFFFF" />
  <circle cx="14.75" cy="9.75" r="1" fill="#FFFFFF" />
  ${mouth}
</svg>`;
}

export function hangarStatusBubbleSVG({
  fill = '#0EA5E9',
  stroke = 'none',
  size = 40,
  symbol = 'bike',
}: {
  fill?: string;
  stroke?: string;
  size?: number;
  symbol?: 'bike' | 'clock' | 'question';
} = {}) {
  const w = size;
  const h = size;

  const symbolPaths: Record<'bike' | 'clock' | 'question', string> = {
    bike: `
      <circle cx="8.2" cy="14" r="2.4" stroke="#FFFFFF" stroke-width="1.7" fill="none" />
      <circle cx="15.8" cy="14" r="2.4" stroke="#FFFFFF" stroke-width="1.7" fill="none" />
      <path d="M9.6 13.8 11.7 9.8" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.2 13.8h3.7" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.7 9.8h2.2" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.7 9.8 14 13.8" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    `,
    clock: `
      <circle cx="12" cy="12.5" r="4.8" stroke="#FFFFFF" stroke-width="1.8" fill="none" />
      <path d="M12 10v2.8l2 1" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    `,
    question: `
      <path d="M10.2 9.6c.4-1.1 1.5-1.8 2.7-1.8 1.6 0 2.9 1.1 2.9 2.7 0 1.4-.9 2.2-1.9 2.7-.7.3-1.1.7-1.1 1.3v.4" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="12" cy="16.8" r="0.8" fill="#FFFFFF" />
    `,
  };

  const inner = symbolPaths[symbol] ?? symbolPaths.question;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}">
  <path fill-rule="evenodd" d="M2.25 12c0-4.97 4.694-9 10.5-9s10.5 4.03 10.5 9c0 2.485-1.23 4.735-3.25 6.388V21a.75.75 0 0 1-1.064.625L15 20.25a12.9 12.9 0 0 1-2.25.195c-5.806 0-10.5-4.03-10.5-9Z" clip-rule="evenodd"/>
  ${inner}
</svg>`;
}
