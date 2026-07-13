/**
 * Organization landing home page — the 84softworks org business card.
 * Single static page (no backend): brand top-band with a scroll-morphing wordmark,
 * founder-first editorial body, flagship case study, track-record metrics, hiring
 * and contacts. Copy comes from the i18n dictionary; the header animation lives in
 * useHeaderMorph.
 */
import { useState } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useHeaderMorph } from './useHeaderMorph';
import LanguageToggle from './LanguageToggle';
import ContactMenu from './ContactMenu';
import HeroField from './HeroField';
import { pickHeroVariant, HERO_VARIANTS } from './heroFieldEngine';
import { EMAIL, socialLinks } from './contacts';

const FOUNDER_PHOTO = '/founder.jpg';

const Home = () => {
  const { t } = useLang();
  const { logo, navAnchor, navbar, bandFront, bandBg, eyebrow } = useHeaderMorph();
  // Pick one of the nine hero designs on load; the full-screen wordmark re-rolls it.
  const [heroVariant, setHeroVariant] = useState(pickHeroVariant);

  // Shared by the wordmark and the eyebrow: at the top it shuffles the hero design,
  // once scrolled it returns to the top.
  const onWordmarkActivate = () => {
    if (window.scrollY < 8) {
      setHeroVariant((current) => {
        const others = HERO_VARIANTS.filter((variant) => variant !== current);
        return others[Math.floor(Math.random() * others.length)];
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard activation for the div-based buttons (wordmark, eyebrow).
  const onActivateKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onWordmarkActivate();
    }
  };

  // Smooth-scroll to a section by script only — never write the hash to the URL,
  // so a reload doesn't jump straight to the last-clicked section.
  const scrollToSection = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar" ref={navbar}>
        <div className="wrap">
          <div className="brand-anchor" ref={navAnchor}>
            84softworks
          </div>
          <nav className="navlinks">
            {t.nav.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0 ? 'is-active' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <LanguageToggle />
            <ContactMenu variant="pill" />
          </div>
        </div>
      </header>

      {/* Animated backdrop — fixed behind the page body, which scrolls up and covers it. */}
      <div className="bandbg" ref={bandBg} aria-hidden="true">
        <HeroField variant={heroVariant} hostRef={bandBg} />
      </div>

      {/* Wordmark layer — fixed above the page body so the morphing wordmark reaches the
          header uncovered. Transparent to pointer input except the wordmark itself. */}
      <div className="bandfront" ref={bandFront}>
        <div className="hero">
          <div className="wrap">
            <div
              className="eyebrow"
              ref={eyebrow}
              role="button"
              tabIndex={0}
              onClick={onWordmarkActivate}
              onKeyDown={onActivateKey}
            >
              {t.heroEyebrow}
            </div>
            <div
              className="wordmark"
              ref={logo}
              role="button"
              tabIndex={0}
              aria-label="84softworks — shuffle hero background"
              onClick={onWordmarkActivate}
              onKeyDown={onActivateKey}
            >
              84softworks
            </div>
          </div>
        </div>
      </div>

      {/* Holds the band's place in normal flow so the body starts below it (desktop). */}
      <div className="band-spacer" aria-hidden="true" />

      <main className="page-body">
        <section className="intro">
        <div className="wrap">
          <h1 className="heroline">{t.heroline}</h1>
          <p className="lede">{t.lede}</p>
          <div className="metastrip">
            {t.heroMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong> {metric.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="founder">
        <div className="wrap">
          <hr className="hr" />
          <div className="kicker">{t.founderKicker}</div>
          <div className="founder">
            <img className="founder__photo" src={FOUNDER_PHOTO} alt={t.founderName} />
            <div>
              <div className="name">{t.founderName}</div>
              <p className="body body--tight">{t.founderBio}</p>
              <div className="socials">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flagship">
        <div className="wrap">
          <hr className="hr" />
          <div className="kicker">{t.flagshipKicker}</div>
          <h2>{t.flagshipTitle}</h2>
          <p className="body">{t.flagshipIntro}</p>
          <div className="tiles">
            {t.pillars.map((pillar) => (
              <div className="tile" key={pillar.title}>
                <div className="tile__ph" />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
          <div className="kill">
            {t.kill.pre}
            <b>{t.kill.bold}</b>
            {t.kill.post}
          </div>
        </div>
      </section>

      <section id="track">
        <div className="wrap">
          <hr className="hr" />
          <div className="kicker">{t.trackKicker}</div>
          <h2>{t.trackTitle}</h2>
          <p className="body">{t.trackBody}</p>
          <div className="mlist">
            {t.trackRecord.map((row) => (
              <div className="mrow" key={row.label}>
                <span className="mrow__lbl">{row.label}</span>
                <span className="mrow__num">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join">
        <div className="wrap">
          <hr className="hr" />
          <div className="kicker">{t.joinKicker}</div>
          <h2>{t.joinTitle}</h2>
          <p className="body">{t.joinBody}</p>
          <div className="join-cta">
            <ContactMenu variant="fill" />
            <span className="join-cta__note">{t.joinNote}</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer__cols">
            <div className="footer__col">
              <strong>84softworks</strong>
              <br />
              <span className="muted">{t.footerTagline}</span>
            </div>
            <div className="footer__col">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              {socialLinks.map((social, index) => (
                <span key={social.label}>
                  {index > 0 && ' · '}
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </span>
              ))}
            </div>
            <div className="footer__col muted">{t.footerRights}</div>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
};

export default Home;
