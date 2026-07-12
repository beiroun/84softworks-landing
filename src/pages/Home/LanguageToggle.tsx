/** RU/EN language switch shown in the header. */
import { useLang } from '../../i18n/LangContext';
import type { Lang } from '../../i18n/dict';

const options: Lang[] = ['en', 'ru'];

const LanguageToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="langtoggle" role="group" aria-label="Language">
      {options.map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? 'is-active' : undefined}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
