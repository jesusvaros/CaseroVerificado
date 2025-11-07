import type { ComponentType, SVGProps } from 'react';
import {
  CheckBadgeIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FaceNeutralIcon,
} from '@heroicons/react/24/solid';

import type { HangarStatus } from '../../services/supabase/publicReviews';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type HangarVisualMeta = {
  label: string;
  description: string;
  accentBarClass: string;
  iconContainerClass: string;
  badgeClass: string;
  headerClass: string;
  Icon: IconComponent;
};

type ExperienceMeta = {
  label: string;
  description: string;
  badgeClass: string;
  textClass: string;
  Icon: IconComponent;
};

export function getHangarVisualMeta(
  useHangar: boolean | null | undefined,
  explicitStatus: HangarStatus | null | undefined
): HangarVisualMeta {
  if (explicitStatus === 'active' || useHangar === true) {
    return {
      label: 'Usa el hangar',
      description: 'Esta persona tiene plaza activa en el hangar de bicis.',
      accentBarClass: 'bg-sky-500',
      iconContainerClass: 'bg-sky-100 text-sky-700',
      badgeClass: 'bg-sky-100 text-sky-700',
      headerClass: 'bg-sky-600',
      Icon: CheckBadgeIcon,
    };
  }

  if (explicitStatus === 'waitlist' || useHangar === false) {
    return {
      label: 'En lista de espera',
      description: 'Está esperando plaza en el hangar y aún no puede usarlo.',
      accentBarClass: 'bg-amber-500',
      iconContainerClass: 'bg-amber-100 text-amber-700',
      badgeClass: 'bg-amber-100 text-amber-700',
      headerClass: 'bg-amber-600',
      Icon: ClockIcon,
    };
  }

  return {
    label: 'Sin datos del hangar',
    description: 'La reseña no indica si tiene plaza o si sigue en espera.',
    accentBarClass: 'bg-gray-400',
    iconContainerClass: 'bg-gray-100 text-gray-600',
    badgeClass: 'bg-gray-100 text-gray-600',
    headerClass: 'bg-gray-600',
    Icon: QuestionMarkCircleIcon,
  };
}

export function getExperienceMeta(value: number | null | undefined): ExperienceMeta {
  if (typeof value === 'number') {
    if (value >= 4) {
      return {
        label: 'Experiencia positiva',
        description: 'La experiencia en el hangar ha sido satisfactoria.',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        textClass: 'text-emerald-700',
        Icon: FaceSmileIcon,
      };
    }

    if (value <= 2) {
      return {
        label: 'Experiencia negativa',
        description: 'Señala incidencias o un uso poco recomendable.',
        badgeClass: 'bg-rose-100 text-rose-700',
        textClass: 'text-rose-700',
        Icon: FaceFrownIcon,
      };
    }

    return {
      label: 'Experiencia neutra',
      description: 'No destaca puntos especialmente buenos ni malos.',
      badgeClass: 'bg-slate-100 text-slate-700',
      textClass: 'text-slate-700',
      Icon: FaceNeutralIcon,
    };
  }

  return {
    label: 'Sin valoración',
    description: 'La reseña no incluye una valoración numérica.',
    badgeClass: 'bg-gray-100 text-gray-600',
    textClass: 'text-gray-600',
    Icon: QuestionMarkCircleIcon,
  };
}
