import React from 'react';
import { ShieldCheckIcon, ClockIcon, UsersIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '../i18n/useTranslations';

const BenefitsSection: React.FC = () => {
  const { t } = useTranslations();
  const benefits = [
    {
      Icon: ShieldCheckIcon,
      title: t('home.benefits.item1Title'),
      text: t('home.benefits.item1Text'),
    },
    {
      Icon: ClockIcon,
      title: t('home.benefits.item2Title'),
      text: t('home.benefits.item2Text'),
    },
    {
      Icon: UsersIcon,
      title: t('home.benefits.item3Title'),
      text: t('home.benefits.item3Text'),
    },
    {
      Icon: BoltIcon,
      title: t('home.benefits.item4Title'),
      text: t('home.benefits.item4Text'),
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-left text-3xl font-bold">{t('home.benefits.title')}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col rounded-lg bg-white p-6 text-left shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4A5E32]/10">
                <Icon className="h-8 w-8 text-[#4A5E32]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
