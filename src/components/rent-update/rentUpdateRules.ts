// How much the yearly rent update can be, by the date it falls on (artículo 18 LAU).
// Every legal date lives here so a decree being repealed is a one-line change.
//
// - Contracts signed from 26 May 2023 (Ley 12/2023): the update can never exceed the IRAV.
// - Real Decreto-ley 29/2026 (in force 8 Oct 2026): the IRAV cap reaches every contract, and
//   updates until 31 Dec 2027 cannot exceed 2 % without a new agreement (disposición final sexta).
//   It still needs Congress' validation: set RDL_29_2026 to 'repealed' if it falls.
// - Real Decreto-ley 8/2026 put a 2 % cap from 22 Mar to 29 Apr 2026 and was not validated;
//   updates in that window only get a note.

export const RDL_29_2026: 'pending' | 'validated' | 'repealed' = 'pending';

const HOUSING_LAW = '2023-05-26';
const FIRST_SUPPORTED = '2025-01-01';
const RDL_8_FROM = '2026-03-22';
const RDL_8_TO = '2026-04-29';
const RDL_29_FROM = '2026-10-08';
const EXTRA_CAP_TO = '2027-12-31';
const EXTRA_CAP = 2;
// The INE publishes each IRAV month around the middle of the next one.
const IRAV_PUBLISHED_DAY = 16;

export type Clause = 'yes' | 'no';
export type Tensioned = 'yes' | 'no' | 'unknown';

export interface RentUpdateInput {
  signed: string; // YYYY-MM-DD
  update: string; // YYYY-MM-DD
  rent: number;
  clause: Clause;
  tensioned: Tensioned;
}

export type RentUpdateResult =
  | { kind: 'noClause' }
  | { kind: 'beforeFirstYear' }
  | { kind: 'tooOld' }
  // Signed before the housing law and updated before the decree: the contract clause rules, with no legal cap
  | { kind: 'contractOnly'; rdl8: boolean }
  | {
      kind: 'capped';
      pct: number;
      maxRent: number;
      iravMonth: string;
      iravValue: number;
      // The IRAV month is not published yet: the latest one stands in
      estimated: boolean;
      extraordinary: boolean;
      rdl8: boolean;
      tensioned: Tensioned;
    };

const addMonths = (month: string, delta: number) => {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
};

// The month of the last IRAV the INE had published on that date.
export function iravMonthFor(update: string) {
  const day = Number(update.slice(8, 10));
  return addMonths(update.slice(0, 7), day >= IRAV_PUBLISHED_DAY ? -1 : -2);
}

// The next date the contract turns another year, from today.
export function nextAnniversary(signed: string, today = new Date().toISOString().slice(0, 10)) {
  const [y, rest] = [Number(signed.slice(0, 4)), signed.slice(4)];
  let year = Math.max(y + 1, Number(today.slice(0, 4)));
  if (`${year}${rest}` < today) year += 1;
  return `${year}${rest}`;
}

export function computeRentUpdate(input: RentUpdateInput, irav: Record<string, number>): RentUpdateResult {
  const { signed, update, rent, clause, tensioned } = input;
  if (clause === 'no') return { kind: 'noClause' };
  if (update < nextAnniversary(signed, signed)) return { kind: 'beforeFirstYear' };
  if (update < FIRST_SUPPORTED) return { kind: 'tooOld' };

  const decree = RDL_29_2026 !== 'repealed' && update >= RDL_29_FROM;
  const rdl8 = update >= RDL_8_FROM && update <= RDL_8_TO;
  if (!decree && signed < HOUSING_LAW) return { kind: 'contractOnly', rdl8 };

  const months = Object.keys(irav).sort();
  const wanted = iravMonthFor(update);
  const iravMonth = irav[wanted] != null ? wanted : months[months.length - 1];
  const iravValue = irav[iravMonth];
  const extraordinary = decree && update <= EXTRA_CAP_TO && iravValue > EXTRA_CAP;
  const pct = extraordinary ? EXTRA_CAP : iravValue;

  return {
    kind: 'capped',
    pct,
    maxRent: Math.round(rent * (100 + pct)) / 100,
    iravMonth,
    iravValue,
    estimated: iravMonth !== wanted,
    extraordinary,
    rdl8,
    tensioned: decree && update <= EXTRA_CAP_TO ? tensioned : 'no',
  };
}
