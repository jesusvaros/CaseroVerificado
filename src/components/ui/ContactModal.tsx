// ContactModal.tsx
import React from 'react';
import type { User } from '@supabase/supabase-js';
import LoginContent from './LoginContent';
import { umamiEventProps } from '../../utils/analytics';

interface ContactModalProps {
  onClose: () => void;
  onLoginComplete?: (sessionId: string, userId: string) => void;
  onUserLoggedIn?: (user: User) => void;
  redirectToHomeIfNoSession?: boolean;
  showInfo?: boolean;
  showTitle?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({
  onClose,
  onLoginComplete,
  onUserLoggedIn,
  redirectToHomeIfNoSession,
  showInfo = true,
  showTitle = true,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm sm:px-6">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:text-gray-700"
            aria-label="Cerrar"
            {...umamiEventProps('login:modal-close')}
          >
            ✕
          </button>
          <LoginContent
            onClose={onClose}
            showTitle={showTitle}
            showInfo={showInfo}
            onLoginComplete={onLoginComplete}
            onUserLoggedIn={onUserLoggedIn}
            redirectToHomeIfNoSession={redirectToHomeIfNoSession}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
