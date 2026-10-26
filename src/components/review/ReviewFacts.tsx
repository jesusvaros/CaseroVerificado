const DEPOSIT: Record<string, { label: string; good: boolean }> = {
  true: { label: 'Fianza devuelta entera', good: true },
  partial: { label: 'Fianza devuelta en parte', good: false },
  false: { label: 'Fianza no devuelta', good: false },
  ongoing: { label: 'Sigue viviendo aquí', good: true },
};

interface ReviewFactsProps {
  startYear?: number | null;
  endYear?: number | null;
  price?: number | null;
  depositReturned?: string;
  includedServices?: string[] | null;
  ownerType?: string;
}

// Years, rent, deposit outcome and (older reviews) what the rent included and who rented it out.
const ReviewFacts = ({ startYear, endYear, price, depositReturned, includedServices, ownerType }: ReviewFactsProps) => {
  const deposit = depositReturned ? DEPOSIT[depositReturned] : undefined;
  const facts = [
    startYear && { label: 'Vivió aquí', value: `${startYear} – ${endYear ?? 'hoy'}` },
    price && { label: 'Alquiler', value: `${Math.round(Number(price)).toLocaleString('es-ES')} € al mes` },
    ownerType && { label: 'Alquilado por', value: ownerType === 'Agencia' ? 'Agencia' : 'Particular' },
    includedServices?.length && { label: 'Incluía', value: includedServices.join(', ') },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-col gap-5">
      {deposit && (
        <span className={`w-fit rounded-full px-3 py-1.5 text-sm font-bold ${deposit.good ? 'bg-lime-soft text-[#1E5A12]' : 'bg-coral-soft text-coral-ink'}`}>
          {deposit.label}
        </span>
      )}
      {facts.length > 0 && (
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {facts.map(fact => (
            <div key={fact.label}>
              <dt className="text-sm text-ink-muted">{fact.label}</dt>
              <dd className="font-display text-xl font-extrabold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default ReviewFacts;
