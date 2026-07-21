/**
 * Language context: holds the active language, persists the choice, and exposes
 * the resolved copy. Base language is the client locale (ru-* → Russian), unless
 * the visitor has already chosen one (localStorage).
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dict, type Copy, type Lang } from './dict';

interface LangState {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Copy;
}

const STORAGE_KEY = 'lang';
const LangCtx = createContext<LangState | null>(null);

const detectLang = (): Lang => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ru') return stored;
  // No prior choice — fall back to the client locale; anything ru-* defaults to Russian.
  const locale = navigator.language?.toLowerCase() ?? 'en';
  return locale.startsWith('ru') ? 'ru' : 'en';
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang].docTitle;
  }, [lang]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangCtx.Provider>;
};

export const useLang = (): LangState => {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
};
