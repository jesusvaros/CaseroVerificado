import type { Locale } from '../config';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import pt from './pt.json';

export type TranslationDictionary = typeof es;

export const MESSAGES: Record<Locale, TranslationDictionary> = {
  es,
  en: en as TranslationDictionary,
  fr: fr as TranslationDictionary,
  de: de as TranslationDictionary,
  pt: pt as TranslationDictionary,
};
