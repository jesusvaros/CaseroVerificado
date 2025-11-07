import { Marker } from 'react-leaflet';
import type { PublicReview } from '../../services/supabase/publicReviews';

import { svgToIcon } from './svgIcon';
import { hangarStatusBubbleSVG } from './heroPin';
import type { HangarStatus } from '../../services/supabase/publicReviews';

interface Props {
  reviews: PublicReview[];
  selectedId?: string | number | null;
  onSelect?: (review: PublicReview) => void;
}

function buildIcon(status: HangarStatus, size: number, isSelected: boolean) {
  const palette: Record<HangarStatus, { base: string; selected: string; symbol: 'bike' | 'clock' | 'question' }> = {
    active: { base: '#0EA5E9', selected: '#0369A1', symbol: 'bike' },
    waitlist: { base: '#F97316', selected: '#C2410C', symbol: 'clock' },
    unknown: { base: '#6B7280', selected: '#374151', symbol: 'question' },
  };

  const colors = palette[status] ?? palette.unknown;
  return svgToIcon(
    hangarStatusBubbleSVG({
      fill: isSelected ? colors.selected : colors.base,
      size,
      symbol: colors.symbol,
    }),
    [size, size],
    [size / 2, size]
  );
}

export default function PublicReviewsLayer({ reviews, selectedId, onSelect }: Props) {
  if (!reviews?.length) return null;

  return (
    <>
      {reviews
        .filter(
          (r): r is Required<Pick<PublicReview, 'id' | 'lat' | 'lng'>> & PublicReview =>
            typeof r.id !== 'undefined' && typeof r.lat === 'number' && typeof r.lng === 'number'
        )
        .map(r => {
          const isSelected = String(r.id) === String(selectedId ?? '');
          const size = isSelected ? 52 : 42;
          const status: HangarStatus = r.hangarStatus ?? (r.useHangar === false ? 'waitlist' : r.useHangar === true ? 'active' : 'unknown');
          const icon = buildIcon(status, size, isSelected);
          const zIndexOffset = isSelected ? 1200 : 400; // keep selected above others

          return (
            <Marker
              key={`public-${r.id}`}
              position={[r.lat as number, r.lng as number]}
              icon={icon}
              eventHandlers={{
                click: () => onSelect?.(r),
              }}
              riseOnHover
              zIndexOffset={zIndexOffset}
            />
          );
        })}
    </>
  );
}
