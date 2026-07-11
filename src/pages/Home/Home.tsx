/**
 * Organization landing home page — the 84softworks org business card.
 * Single static page (no backend): brand top-band, founder-first editorial body,
 * flagship case study, track-record metrics, hiring and contacts.
 * Copy is the canonical EN draft (content-draft.md); RU i18n is a later pass.
 */

const EMAIL = '84softworks@gmail.com';
const FOUNDER_PHOTO = '/founder.jpg';

const navLinks = [
  { href: '#founder', label: 'Founder', active: true },
  { href: '#flagship', label: 'Flagship' },
  { href: '#track', label: 'Track record' },
  { href: '#join', label: 'Join' }
];

const heroMetrics = [
  { value: '250K+', label: 'calls' },
  { value: '500K+', label: 'users' },
  { value: '14M+', label: 'payments' },
  { value: '11', label: 'products shipped' }
];

const founderSocials = [
  { label: 'GitHub', href: 'https://github.com/beiroun' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-baranov-173993419' },
  { label: 'Instagram', href: 'https://www.instagram.com/84softworks' }
];

const flagshipPillars = [
  {
    title: 'SenseFlow — AI analytics core',
    body: 'Transcription, diarization, 24 marketing signals, a RAG assistant and automatic ticketing — a task router that parallelizes AI work, a computing environment for heavy analysis on cheap hardware, and a chat/voice environment.'
  },
  {
    title: 'TLDR Messenger — in-house messaging',
    body: 'A fully in-house messaging platform — operator and client apps, attachments, surveys, real-time delivery.'
  }
];

const trackRecord = [
  { label: 'Calls analyzed', value: '250K+' },
  { label: 'Users · MAU', value: '500K+ · 200K' },
  { label: 'Service requests', value: '1.5M+' },
  { label: 'Payment records', value: '14M+' },
  { label: 'Intercoms · cameras', value: '5,000 · 20,000' },
  { label: 'Team · building since', value: '6 · 2023' }
];

const Home = () => {
  return (
    <>
      <div className="topband">
        <nav>
          <div className="wrap">
            <div className="brand">84softworks</div>
            <div className="navlinks">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={link.active ? 'is-active' : undefined}>
                  {link.label}
                </a>
              ))}
            </div>
            <a className="cta-pill" href={`mailto:${EMAIL}`}>
              Get in touch
            </a>
          </div>
        </nav>
        <header className="hero">
          <div className="wrap">
            <div className="wordmark">84softworks</div>
          </div>
        </header>
      </div>

      <section className="intro">
        <div className="wrap">
          <h1 className="heroline">I turn business problems into production software.</h1>
          <p className="lede">
            Andrei Baranov, Founder &amp; CEO of 84softworks. Reliable B2B AI — architected end to end.
          </p>
          <div className="metastrip">
            {heroMetrics.map((metric) => (
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
          <div className="kicker">Founder &amp; CEO</div>
          <div className="founder">
            <img className="founder__photo" src={FOUNDER_PHOTO} alt="Andrei Baranov" />
            <div>
              <div className="name">Andrei Baranov · beiroun</div>
              <p className="body body--tight">
                A builder-leader who's been through every layer of the stack — backend, mobile, AI,
                infrastructure. I don't just write code; I turn business goals into products through
                architecture, team and process. As Head of Development I led a team of six and shipped
                eleven production products at scale: AI call analytics, high-load mobile apps,
                bare-metal Kubernetes. Now I'm building 84softworks — reliable B2B software that holds
                up in production.
              </p>
              <div className="socials">
                {founderSocials.map((social) => (
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
          <div className="kicker">Flagship — case study</div>
          <h2>FusionDynamics</h2>
          <p className="body">
            An AI analytics and communications system I architected and built with my team — running
            in production, not in slides.
          </p>
          <div className="tiles">
            {flagshipPillars.map((pillar) => (
              <div className="tile" key={pillar.title}>
                <div className="tile__ph" />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
          <div className="kill">
            The entire AI stack squeezed onto two consumer GPUs — <b>under $2,700</b> of hardware.
            Enterprise-grade insight without enterprise hardware.
          </div>
        </div>
      </section>

      <section id="track">
        <div className="wrap">
          <hr className="hr" />
          <div className="kicker">Track record</div>
          <h2>The numbers</h2>
          <p className="body">
            84softworks is founded on years of shipping software that runs in production, not in
            slides. As Head of Development at a telecom I led development of eleven production products
            with a six-person team.
          </p>
          <div className="mlist">
            {trackRecord.map((row) => (
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
          <div className="kicker">Join</div>
          <h2>Always open to exceptional people.</h2>
          <p className="body">
            Not actively hiring right now — but if you build software that holds and want to work with
            someone who's been through every layer, reach out.
          </p>
          <a className="btn-fill" href={`mailto:${EMAIL}`}>
            Get in touch
          </a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer__cols">
            <div className="footer__col">
              <strong>84softworks</strong>
              <br />
              <span className="muted">Building since 2023 · 84softworks.io</span>
            </div>
            <div className="footer__col">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              {founderSocials.map((social, index) => (
                <span key={social.label}>
                  {index > 0 && ' · '}
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </span>
              ))}
            </div>
            <div className="footer__col muted">© 2026 84softworks</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
