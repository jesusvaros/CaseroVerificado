import { useTranslations } from '../../i18n/useTranslations';
import { REVIEW_TAGS, type ReviewTag } from './reviewTags';

// Optional chips; positive ones first, then problems.
const TagPicker = ({ value, onChange }: { value: ReviewTag[]; onChange: (tags: ReviewTag[]) => void }) => {
  const { t } = useTranslations();
  const toggle = (id: ReviewTag) => onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id]);

  return (
    <div className="flex flex-wrap gap-2.5">
      {REVIEW_TAGS.map(tag => {
        const selected = value.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(tag.id)}
            className={`rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              selected
                ? tag.tone === 'good'
                  ? 'bg-lime-soft text-[#1E5A12] ring-1 ring-[#1E5A12]'
                  : 'bg-coral-soft text-coral-ink ring-1 ring-coral-ink'
                : 'border-[1.5px] border-[#C9D2BC] bg-white text-ink hover:border-brand'
            }`}
          >
            {t(`reviewTags.${tag.id}`)}
          </button>
        );
      })}
    </div>
  );
};

export default TagPicker;
