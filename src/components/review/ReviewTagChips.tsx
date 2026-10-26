import { useTranslations } from '../../i18n/useTranslations';
import { tagTone } from '../review-form/reviewTags';

const ReviewTagChips = ({ tags }: { tags?: string[] | null }) => {
  const { t } = useTranslations();
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 text-[13px] font-bold">
      {tags.map(tag => (
        <span key={tag} className={`rounded-full px-2.5 py-1 ${tagTone(tag) === 'good' ? 'bg-lime-soft text-[#1E5A12]' : 'bg-coral-soft text-coral-ink'}`}>
          {t(`reviewTags.${tag}`)}
        </span>
      ))}
    </div>
  );
};

export default ReviewTagChips;
