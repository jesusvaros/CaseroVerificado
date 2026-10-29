import React, { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { FormDataType } from './formTypes';
import { initialFormData } from './formTypes';
import { FormContext } from './FormContextInstance';

// The review in progress is kept in this browser only (nothing is sent until "Enviar"), so
// leaving the page or coming back from the login email does not lose what was typed.
const DRAFT_KEY = 'caserook:review-draft';

function readDraft(): FormDataType | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? { ...initialFormData, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState('');
  const [restoredDraft] = useState(readDraft);
  const [formData, setFormData] = useState<FormDataType>(() => restoredDraft ?? initialFormData);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (formData === initialFormData) window.localStorage.removeItem(DRAFT_KEY);
        else window.localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      } catch {
        // private mode or full storage: the draft just is not kept
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [formData]);

  const updateFormData = useCallback((data: Partial<FormDataType>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setAddress('');
  }, []);

  return (
    <FormContext.Provider
      value={{
        address,
        setAddress,
        formData,
        updateFormData,
        resetForm,
        hasRestoredDraft: restoredDraft !== null,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// useFormContext hook has been moved to its own file
