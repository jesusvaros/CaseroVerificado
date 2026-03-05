import React, { useEffect, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import StaticFormMessage from './StaticFormMessage';
import { useTranslations } from '../../i18n/useTranslations';

interface StaticFormMessagesContainerProps {
  step: number;
  isMobile?: boolean;
}

const StaticFormMessagesContainer: React.FC<StaticFormMessagesContainerProps> = ({
  step,
  isMobile = false,
}) => {
  const { t } = useTranslations();
  // Definir los mensajes para cada paso
  const getMessagesForStep = () => {
    switch (step) {
      case 1:
        return [
          {
            id: 'step1-anonymous',
            title: t('addReview.staticMessages.step1Title'),
            message: t('addReview.staticMessages.step1Message'),
            backgroundColor: 'rgb(225, 245, 110)',
            textColor: '#232C17',
            icon: undefined,
          },
        ];
      case 2:
        return [
          {
            id: 'step2-rental',
            title: t('addReview.staticMessages.step2Title'),
            message: t('addReview.staticMessages.step2Message'),
            backgroundColor: 'rgb(225, 245, 110)',
            textColor: '#232C17',
            icon: undefined,
          },
        ];
      case 3:
        return [
          {
            id: 'step3-condition',
            title: t('addReview.staticMessages.step3Title'),
            message: t('addReview.staticMessages.step3Message'),
            backgroundColor: 'rgb(225, 245, 110)',
            textColor: '#232C17',
            icon: undefined,
          },
        ];
      case 4:
        return [
          {
            id: 'step4-community',
            title: t('addReview.staticMessages.step4Title'),
            message: t('addReview.staticMessages.step4Message'),
            backgroundColor: 'rgb(225, 245, 110)',
            textColor: '#232C17',
            icon: undefined,
          },
        ];
      case 5:
        return [
          {
            id: 'step5-privacy',
            title: t('addReview.staticMessages.step5Title'),
            message: t('addReview.staticMessages.step5Message'),
            backgroundColor: 'rgb(225, 245, 110)',
            textColor: '#232C17',
            icon: <LockClosedIcon className="h-5 w-5 text-green-700" />,
          },
        ];
      default:
        return [];
    }
  };

  const messages = getMessagesForStep();

  // React to hover/focus on the lock icon in HashedContactInput
  const [privacyHover, setPrivacyHover] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // CustomEvent<boolean>
      const ce = e as CustomEvent<boolean>;
      setPrivacyHover(Boolean(ce.detail));
    };
    window.addEventListener('cv:privacyHover', handler as EventListener);
    return () => window.removeEventListener('cv:privacyHover', handler as EventListener);
  }, []);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={`${isMobile ? 'mt-2 w-full space-y-6' : ''}`}>
      {messages.map(msg => (
        <div key={msg.id} className="relative">
          {/* Icon overlay on hover */}
          {privacyHover && (
            <div className="pointer-events-none absolute left-3 top-3 text-green-600">
              <LockClosedIcon className="h-5 w-5" />
            </div>
          )}
          <StaticFormMessage
            title={msg.title}
            message={msg.message}
            backgroundColor={msg.backgroundColor}
            textColor={msg.textColor}
            className={`transition-transform duration-150 ${privacyHover ? 'scale-[1.05]' : ''}`}
            icon={msg.icon || undefined} 
          />
        </div>
      ))}
    </div>
  );
};

export default StaticFormMessagesContainer;
