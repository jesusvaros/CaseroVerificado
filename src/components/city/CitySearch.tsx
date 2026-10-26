import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMunicipalities, type Municipality } from '../../services/publicData/municipalities';
import { useTranslations } from '../../i18n/useTranslations';

// Jump to any municipality with official rent data, with or without reviews.
const CitySearch = ({ dark = false }: { dark?: boolean }) => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Municipality[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    searchMunicipalities(query).then(found => {
      if (!cancelled) {
        setResults(found);
        setActive(0);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const go = (municipality: Municipality) => {
    setQuery('');
    setResults([]);
    navigate(`/opiniones/espana/${municipality.slug}`);
  };

  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor="city-search" className="sr-only">{t('cityPage.searchLabel')}</label>
      <input
        id="city-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') setActive(i => Math.min(i + 1, results.length - 1));
          if (e.key === 'ArrowUp') setActive(i => Math.max(i - 1, 0));
          if (e.key === 'Enter' && results[active]) {
            e.preventDefault();
            go(results[active]);
          }
        }}
        placeholder={t('cityPage.searchPlaceholder')}
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls="city-search-results"
        className={`h-12 w-full rounded-full border-0 px-5 text-base focus:outline-none focus:ring-2 focus:ring-lime ${
          dark ? 'bg-white/10 text-white placeholder:text-[#9FC3A5]' : 'bg-mist text-ink placeholder:text-ink-muted'
        }`}
      />
      {results.length > 0 && (
        <ul id="city-search-results" role="listbox" className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-2xl bg-white py-1 text-ink shadow-xl ring-1 ring-black/5">
          {results.map((m, i) => (
            <li key={m.cumun} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => go(m)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${i === active ? 'bg-mist' : 'hover:bg-mist'}`}
              >
                <span className="font-semibold">{m.name}</span>
                <span className="text-sm text-ink-muted">{m.p50.toLocaleString('es-ES')} €/m²</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
