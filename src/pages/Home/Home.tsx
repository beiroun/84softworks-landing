/**
 * Organization landing home page — the 84softworks org business card.
 * Single static page (no backend): brand top-band with a scroll-morphing wordmark,
 * founder-first editorial body, flagship case study, track-record metrics, hiring
 * and contacts. Copy comes from the i18n dictionary; the header animation lives in
 * useHeaderMorph.
 */
import { useLang } from '../../i18n/LangContext';
import { useHeaderMorph } from './useHeaderMorph';
import LanguageToggle from './LanguageToggle';

const EMAIL = '84softworks@gmail.com';
const FOUNDER_PHOTO = '/founder.jpg';

// Language-invariant social links (labels and hrefs are the same in every language).
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/beiroun' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-baranov-173993419' },
  { label: 'Instagram', href: 'https://www.instagram.com/84softworks' }
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const Home = () => {
  const { t } = useLang();
  const { logo, navAnchor, navbar, topband } = useHeaderMorph();

  return (
    <>
      <header className="navbar" ref={navbar}>
        <div className="wrap">
          <div className="brand-anchor" ref={navAnchor}>
            84softworks
          </div>
          <nav className="navlinks">
            {t.nav.map((link, index) => (
              <a key={link.href} href={link.href} className={index === 0 ? 'is-active' : undefined}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <LanguageToggle />
            <a className="cta-pill" href={`mailto:${EMAIL}`}>
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      <div className="topband" ref={topband}>
        <div className="hero">
          <div className="wrap">
            <div
              className="wordmark"
              ref={logo}
              role="button"
              tabIndex={0}
              aria-label="Scroll to top"
              onClick={scrollToTop}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  scrollToTop();
                }
              }}
            >
              84softworks
            </div>
          </div>
        </div>
      </div>

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
          <a className="btn-fill" href={`mailto:${EMAIL}`}>
            {t.cta}
          </a>
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
    </>
  );
};

export default Home;
