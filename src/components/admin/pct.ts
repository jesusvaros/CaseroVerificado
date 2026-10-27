// Share of a whole as a rounded percentage, or a dash when there is nothing to divide by.
export const pct = (part: number, whole: number) => (whole > 0 ? `${Math.round((part / whole) * 100)} %` : '–');
