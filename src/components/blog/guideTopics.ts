import type { ComponentType, SVGProps } from 'react';
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  CloudIcon,
  DocumentCheckIcon,
  HomeModernIcon,
  KeyIcon,
  LifebuoyIcon,
  MapPinIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export type CoverTone = 'forest' | 'lime' | 'mist' | 'coral';

export type GuideTopic = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: CoverTone;
};

// One topic per guide in src/blog/posts: the label and icon drawn on its cover.
const TOPICS: Record<string, GuideTopic> = {
  'actualizacion-anual-de-la-renta-ipc-irav': { label: 'Subida de renta', Icon: ArrowTrendingUpIcon, tone: 'coral' },
  'ayudas-al-alquiler-bono-alquiler-joven-y-plan-estatal': { label: 'Ayudas', Icon: LifebuoyIcon, tone: 'lime' },
  'como-evaluar-un-contrato-de-alquiler': { label: 'Antes de firmar', Icon: DocumentCheckIcon, tone: 'forest' },
  'devolucion-de-la-fianza-alquiler': { label: 'Fianza', Icon: KeyIcon, tone: 'forest' },
  'duracion-prorrogas-y-preaviso-del-contrato-de-alquiler': { label: 'Duración', Icon: CalendarDaysIcon, tone: 'mist' },
  'gastos-de-agencia-ibi-y-comunidad-quien-paga': { label: 'Gastos', Icon: BanknotesIcon, tone: 'lime' },
  'humedades-y-habitabilidad-como-reclamar': { label: 'Humedades', Icon: CloudIcon, tone: 'coral' },
  'reparaciones-que-paga-el-casero-y-que-el-inquilino': { label: 'Reparaciones', Icon: WrenchScrewdriverIcon, tone: 'mist' },
  'si-venden-el-piso-que-alquilas-tus-derechos': { label: 'Venta del piso', Icon: HomeModernIcon, tone: 'forest' },
  'sindicatos-de-inquilinas-que-hacen-y-como-pedir-ayuda': { label: 'Sindicatos', Icon: UserGroupIcon, tone: 'lime' },
  'zonas-tensionadas-que-son-y-como-saber-si-te-afectan': { label: 'Zonas tensionadas', Icon: MapPinIcon, tone: 'coral' },
};

const FALLBACK: GuideTopic = { label: 'Guía', Icon: DocumentCheckIcon, tone: 'mist' };

export const guideTopic = (slug: string): GuideTopic => TOPICS[slug] ?? FALLBACK;
