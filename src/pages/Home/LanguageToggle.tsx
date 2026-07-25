/** RU/EN language switch shown in the header. */
import { forwardRef } from 'react';
import { useLang } from '../../i18n/LangContext';
import type { Lang } from '../../i18n/dict';

// RU first — the audience and the product screenshots are Russian.
const options: Lang[] = ['ru', 'en'];

// forwardRef so the header morph can drive the mobile left→right slide on the toggle's root.
const LanguageToggle = forwardRef<HTMLDivElement>((_props, ref) => {
  const { lang, setLang } = useLang();

  return (
    <div className="langtoggle" ref={ref} role="group" aria-label="Language">
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
});

LanguageToggle.displayName = 'LanguageToggle';

export default LanguageToggle;
